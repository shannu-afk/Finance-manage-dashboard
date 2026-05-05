import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import PlaidAccount from '../models/PlaidAccount.js';

const configuration = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export const createLinkToken = async (req, res) => {
  try {
    const { userId } = req.user;
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: userId.toString() },
      client_name: 'PFM Dashboard',
      products: ['auth', 'transactions'],
      country_codes: ['US'],
      language: 'en',
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const exchangePublicToken = async (req, res) => {
  try {
    const { public_token } = req.body;
    const response = await plaidClient.itemPublicTokenExchange({
      public_token,
    });
    const access_token = response.data.access_token;
    const accountsResponse = await plaidClient.accountsGet({ access_token });

    const plaidAccount = await PlaidAccount.create({
      userId: req.user.id,
      accessToken: access_token,
      ...accountsResponse.data.accounts[0],
    });

    res.json({
      success: true,
      plaidAccount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlaidAccounts = async (req, res) => {
  try {
    const plaidAccounts = await PlaidAccount.find({ userId: req.user.id });
    res.json(plaidAccounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

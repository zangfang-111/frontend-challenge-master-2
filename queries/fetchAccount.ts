import { gql } from '@apollo/client';

const FETCH_ACCOUNT = gql`
  query fetchAccount($accountId: ID!) {
    account(account_id: $accountId) {
      account {
        id
        todays_demographics_jobs_count
        demographics_daily_quota
      }
      success
      errors
    }
  }
`;

export default FETCH_ACCOUNT;

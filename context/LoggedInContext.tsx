import React, { type ReactNode, useContext, useState, useMemo, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import parseJwt from 'helpers/parseJwt';
import { getTokenFromLocalStorage } from 'lib/scopeApi';
import FETCH_ACCOUNT from 'queries/fetchAccount';
import FETCH_COMPANY from 'queries/fetchCompanyContext';

type LoggedInContextProps = {
  currentUserId: number;
  setCurrentUserId: React.Dispatch<React.SetStateAction<number>>;

  /** Plan features * */
  isPipelineFeature: boolean;
  isFollowingPlanFeatures: boolean;
  isBitlyClicksPlanFeatures: boolean;
  isGrowthPlanFeatures: boolean;
  isDemographicsPlanFeatures: boolean;
  isCollaborationTimelinePlanFeatures: boolean;
  isMostFollowedByPlanFeatures: boolean;
  isSimilarAudiencePlanFeatures: boolean;
  isWobakaPlanFeatures: boolean;
  isHubspotPlanFeatures: boolean;
  isKlaviyoPlanFeatures: boolean;
  isMixmaxPlanFeatures: boolean;
  isContentPlanFeatures: boolean;
  isTrackingPlanFeatures: boolean;
  isLookalikePlanFeatures: boolean;

  /** API keys * */
  wobakaApiKey: string;
  hubspotApiKey: string;
  klaviyoApiKey: string;
  mixmaxApiKey: string;

  /** Active features * */
  isWobakaActive: boolean;
  isHubspotActive: boolean;
  isKlaviyoActive: boolean;
  isMixmaxActive: boolean;

  /** Hidden features * */
  isCrawlerFeatureHidden: boolean;
  isGrowthFeatureHidden: boolean;

  /** Account * */
  todaysDemographicsJobsCount: number;
  demographicsDailyQuota: number;

  /** Company * */
  currency: string;

  /** Daily Quota Lookalikes * */
  dailyQuotaLookalikes: number;
};
type LoggedInProviderProps = {
  children: ReactNode;
};

const defaultCurrency = 'USD';
const loggedInContextDefaultValues: LoggedInContextProps = {
  currentUserId: 0,
  setCurrentUserId: () => 0,

  /** Plan features * */
  isPipelineFeature: false,
  isFollowingPlanFeatures: false,
  isBitlyClicksPlanFeatures: false,
  isGrowthPlanFeatures: false,
  isDemographicsPlanFeatures: false,
  isCollaborationTimelinePlanFeatures: false,
  isMostFollowedByPlanFeatures: false,
  isSimilarAudiencePlanFeatures: false,
  isWobakaPlanFeatures: false,
  isHubspotPlanFeatures: false,
  isKlaviyoPlanFeatures: false,
  isMixmaxPlanFeatures: false,
  isContentPlanFeatures: false,
  isTrackingPlanFeatures: false,
  isLookalikePlanFeatures: false,

  /** API keys * */
  wobakaApiKey: '',
  hubspotApiKey: '',
  klaviyoApiKey: '',
  mixmaxApiKey: '',

  /** Active features * */
  isWobakaActive: false,
  isHubspotActive: false,
  isKlaviyoActive: false,
  isMixmaxActive: false,

  /** Hidden features * */
  isCrawlerFeatureHidden: false,
  isGrowthFeatureHidden: false,

  /** Account * */
  todaysDemographicsJobsCount: 0,
  demographicsDailyQuota: 0,

  /** Company * */
  currency: defaultCurrency,

  /** Daily Quota Lookalikes * */
  dailyQuotaLookalikes: 0,
};

const LoggedInContext = React.createContext<LoggedInContextProps>(loggedInContextDefaultValues);

export function useLoggedInContext(): LoggedInContextProps {
  return useContext(LoggedInContext);
}

export function LoggedInProvider({ children }: LoggedInProviderProps): JSX.Element {
  const [currentUserId, setCurrentUserId] = useState(0);
  const { data } = useQuery(FETCH_COMPANY);

  /** Plan features * */
  const isPipelineFeature = data?.company?.company?.plan_features?.includes('pipeline');
  const isFollowingPlanFeatures = data?.company?.company?.plan_features?.includes('following');
  const isBitlyClicksPlanFeatures = data?.company?.company?.plan_features?.includes('bitly_clicks');
  const isGrowthPlanFeatures = data?.company?.company?.plan_features?.includes('growth');
  const isDemographicsPlanFeatures =
    data?.company?.company?.plan_features?.includes('demographics');
  const isCollaborationTimelinePlanFeatures =
    data?.company?.company?.plan_features?.includes('collab_timeline');
  const isMostFollowedByPlanFeatures =
    data?.company?.company?.plan_features?.includes('most_followedby');
  const isSimilarAudiencePlanFeatures =
    data?.company?.company?.plan_features?.includes('similar_audience');
  const isWobakaPlanFeatures = data?.company?.company?.plan_features?.includes('wobaka');
  const isHubspotPlanFeatures = data?.company?.company?.plan_features?.includes('hubspot');
  const isKlaviyoPlanFeatures = data?.company?.company?.plan_features?.includes('klaviyo');
  const isMixmaxPlanFeatures = data?.company?.company?.plan_features?.includes('mixmax');
  const isContentPlanFeatures = data?.company?.company?.plan_features?.includes('content');
  const isTrackingPlanFeatures = data?.company?.company?.plan_features?.includes('tracking');
  const isLookalikePlanFeatures = data?.company?.company?.plan_features?.includes('lookalike');

  /** API Keys * */
  const wobakaApiKey = data?.company?.company?.wobaka_api_key;
  const hubspotApiKey = data?.company?.company?.hubspot_api_key;
  const klaviyoApiKey = data?.company?.company?.klaviyo_api_key;
  const mixmaxApiKey = data?.company?.company?.mixmax_api_key;

  /** Active features * */
  const isWobakaActive = data?.company?.company?.wobaka_active;
  const isHubspotActive = data?.company?.company?.hubspot_active;
  const isKlaviyoActive = data?.company?.company?.klaviyo_active;
  const isMixmaxActive = data?.company?.company?.mixmax_active;

  /** Hidden features * */
  const isCrawlerFeatureHidden = data?.company?.company?.hidden_features?.includes('crawler');
  const isGrowthFeatureHidden = data?.company?.company?.hidden_features?.includes('growth');

  useEffect(() => {
    const jwtToken = getTokenFromLocalStorage();
    const decodedJwtToken = parseJwt(jwtToken);
    if (decodedJwtToken?.id) {
      setCurrentUserId(decodedJwtToken.id);
    }
  }, []);

  const { data: accountData } = useQuery(FETCH_ACCOUNT, {
    variables: {
      accountId: currentUserId,
    },
  });

  const demographicsDailyQuota = accountData?.account?.account?.demographics_daily_quota;
  const todaysDemographicsJobsCount = accountData?.account?.account?.todays_demographics_jobs_count;

  /** Company * */
  const currency = data?.company?.company?.collaboration_cost_currency ?? defaultCurrency;

  /** Daily Quota Lookalikes * */
  const dailyQuotaLookalikes = data?.get_stripe_info?.stripe_info?.daily_quota_lookalikes;

  const memoLoggedInContextValue = useMemo(() => {
    return {
      currentUserId,
      setCurrentUserId,

      /** Plan features * */
      isPipelineFeature,
      isFollowingPlanFeatures,
      isBitlyClicksPlanFeatures,
      isGrowthPlanFeatures,
      isDemographicsPlanFeatures,
      isCollaborationTimelinePlanFeatures,
      isMostFollowedByPlanFeatures,
      isSimilarAudiencePlanFeatures,
      isWobakaPlanFeatures,
      isHubspotPlanFeatures,
      isKlaviyoPlanFeatures,
      isMixmaxPlanFeatures,
      isContentPlanFeatures,
      isTrackingPlanFeatures,
      isLookalikePlanFeatures,

      /** API keys * */
      wobakaApiKey,
      hubspotApiKey,
      klaviyoApiKey,
      mixmaxApiKey,

      /** Active features * */
      isWobakaActive,
      isHubspotActive,
      isKlaviyoActive,
      isMixmaxActive,

      /** Hidden features * */
      isCrawlerFeatureHidden,
      isGrowthFeatureHidden,

      /** Account * */
      todaysDemographicsJobsCount,
      demographicsDailyQuota,

      /** Company * */
      currency,

      /** Daily Quota Lookalikes * */
      dailyQuotaLookalikes,
    };
  }, [
    currentUserId,
    setCurrentUserId,

    /** Plan features * */
    isPipelineFeature,
    isFollowingPlanFeatures,
    isBitlyClicksPlanFeatures,
    isGrowthPlanFeatures,
    isDemographicsPlanFeatures,
    isCollaborationTimelinePlanFeatures,
    isMostFollowedByPlanFeatures,
    isSimilarAudiencePlanFeatures,
    isWobakaPlanFeatures,
    isHubspotPlanFeatures,
    isKlaviyoPlanFeatures,
    isMixmaxPlanFeatures,
    isContentPlanFeatures,
    isTrackingPlanFeatures,
    isLookalikePlanFeatures,

    /** API keys * */
    wobakaApiKey,
    hubspotApiKey,
    klaviyoApiKey,
    mixmaxApiKey,

    /** Active features * */
    isWobakaActive,
    isHubspotActive,
    isKlaviyoActive,
    isMixmaxActive,

    /** Hidden features * */
    isCrawlerFeatureHidden,
    isGrowthFeatureHidden,

    /** Account * */
    todaysDemographicsJobsCount,
    demographicsDailyQuota,

    /** Company * */
    currency,

    /** Daily Quota Lookalikes * */
    dailyQuotaLookalikes,
  ]);

  return (
    <LoggedInContext.Provider value={memoLoggedInContextValue}>{children}</LoggedInContext.Provider>
  );
}

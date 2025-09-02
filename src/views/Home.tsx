import {
  Box,
  ContextView,
  Link,
  Banner,
  Inline,
  Button,
  Icon,
  Spinner
} from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import React, { useState, useEffect } from "react";

import BrandIcon from "./connecttostripe.svg";
import { useApi } from "./hooks/useApi";
import { PlanInfoSection } from "./components/PlanInfoSection";
import { UsageSection } from "./components/UsageSection";
import { SubscriptionManagement } from "./components/SubscriptionManagement";
import { CheckoutSession } from "./components/CheckoutSession";
import { ManageMailchimp } from "./components/ManageMailchimp";
import { DashboardOverview } from "./components/DashboardOverview";
import { SyncingStatus } from "./components/SyncingStatus";
import { MetricsView } from "./components/MetricsView";
import { ManagePermission } from "./components/ManagePermission";

interface PlanInfo {
  planName: string;
  planDisplayName: string;
  monthlySyncLimit: number;
  currentMonthUsage: number;
  remainingSyncs: number;
  status: string;
}

const Home = ({ userContext }: ExtensionContextValue) => {
  const [mailchimpExists, setMailchimpExists] = useState<boolean | null>(null);
  const [planInfo, setPlanInfo] = useState<PlanInfo | null>(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showFreeDashboard, setShowFreeDashboard] = useState(false);
  const [currentView, setCurrentView] = useState<'overview' | 'checkout' | 'subscription' | 'mailchimp' | 'metrics'>('overview');
  const [isAudienceConfigured, setIsAudienceConfigured] = useState<boolean | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [isPermissionConfigured, setIsPermissionConfigured] = useState<boolean | null>(null);

  const {
    loading,
    error,
    setError,
    createUser,
    checkMailchimpUser,
    fetchPlanInfo,
    fetchCustomerPortalUrl,
    fetchAudiences,
    fetchSelectedAudience,
    saveSelectedAudience,
    clearAudienceSelection,
    disconnectMailchimp,
    getMailchimpAuthUrl,
    getPricingPageUrl,
    completeOnboarding,
    checkOnboardingStatus,
    fetchUsage,
    getAudienceStatus,
    setAudienceStatus,
    getPendingContacts,
  } = useApi(userContext);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessNotification(true);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 3000);
  };


  const handleDisconnectMailchimp = async () => {
    try {
      await disconnectMailchimp();
      setMailchimpExists(false);
      setIsAudienceConfigured(false);
      setIsPermissionConfigured(false);
      setCurrentView('overview');
      showSuccess("Mailchimp disconnected successfully");
    } catch (err) {
      setError((err as Error).message || "Failed to disconnect Mailchimp");
    }
  };

  const handleGetPendingContacts = async () => {
    try {
      const response = await getPendingContacts();
      console.log("Pending contacts response:", response);
      showSuccess("Check console for pending contacts data");
    } catch (err) {
      console.error("Failed to get pending contacts:", err);
      setError((err as Error).message || "Failed to get pending contacts");
    }
  };

  const getTitle = () => {
    if (hasCompletedOnboarding === false && mailchimpExists === false) {
      return 'Getting started';
    }
    if (hasCompletedOnboarding === false && mailchimpExists === true && isAudienceConfigured === false) {
      return 'Getting started';
    }
    if (hasCompletedOnboarding === false && mailchimpExists === true && isAudienceConfigured === true && isPermissionConfigured === false) {
      return 'Getting started';
    }
    if (currentView === 'checkout') {
      return 'Manage Audience';
    }
    if (currentView === 'subscription') {
      return 'Manage Subscription';
    }
    if (currentView === 'mailchimp') {
      return 'Manage Mailchimp';
    }
    if (currentView === 'metrics') {
      return 'Metrics';
    }
    return 'Dashboard';
  };

  const checkAudienceConfiguration = async () => {
    try {
      const selectedId = await fetchSelectedAudience();
      console.log("HERE SELECTED ID: " + JSON.stringify(selectedId));
      setIsAudienceConfigured(selectedId !== "");
    } catch (err) {
      console.error("Failed to check audience configuration:", err);
      setIsAudienceConfigured(false);
    }
  };

  const checkPermissionConfiguration = async () => {
    try {
      const statusData = await getAudienceStatus();
      const currentStatus = statusData.audience_status || "";
      setIsPermissionConfigured(currentStatus !== "");
    } catch (err) {
      console.error("Failed to check permission configuration:", err);
      setIsPermissionConfigured(false);
    }
  };

  const handleFirstAudienceSelection = async (audienceId: string) => {
    await saveSelectedAudience(audienceId);
    await checkAudienceConfiguration();
  };


  useEffect(() => {
    const initializeApp = async () => {
      setError(null);
      setMailchimpExists(null);
      setShowFreeDashboard(false);
      setCurrentView('overview');
      setIsAudienceConfigured(null);
      setHasCompletedOnboarding(null);
      setIsPermissionConfigured(null);

      try {
        await createUser();

        // Check onboarding status first, default to true if failed
        try {
          const onboardingStatus = await checkOnboardingStatus();
          console.log("Onboarding status response:", onboardingStatus);
          const isCompleted = Boolean(onboardingStatus?.completed);
          console.log("Is completed:", isCompleted);
          setHasCompletedOnboarding(isCompleted);
        } catch (err) {
          console.error("Failed to check onboarding status, defaulting to true:", err);
          setHasCompletedOnboarding(true);
        }

        const [mailchimpResponse, planData] = await Promise.all([
          checkMailchimpUser(),
          fetchPlanInfo().catch(err => {
            console.error("Failed to fetch plan info:", err);
            return null;
          })
        ]);

        if (mailchimpResponse.exists) {
          setMailchimpExists(true);
          await checkAudienceConfiguration();
          await checkPermissionConfiguration();
        } else {
          setMailchimpExists(false);
          setIsAudienceConfigured(false);
          setIsPermissionConfigured(false);
        }

        if (planData) {
          setPlanInfo(planData);
        }
      } catch (err) {
        console.error("Initialization error:", err);
        setError((err as Error).message || "Unknown error");
        setHasCompletedOnboarding(true); // Default to true on error
      }
    };

    initializeApp();
  }, [userContext?.id, userContext?.account?.id]);

   console.log("NOW:"  + hasCompletedOnboarding)
  if(hasCompletedOnboarding === false && (mailchimpExists === false || isAudienceConfigured === false || isPermissionConfigured === false)){
    return(
      <ContextView
      title={getTitle()}
      brandIcon={BrandIcon}
      footerContent={
        <Box css={{ marginBottom: "medium" }}>
          Something wrong?{" "}
          <Link
            external
            href="mailto:info@connectto.app"
            target="_blank"
            type="secondary"
          >
            Contact support
          </Link>
        </Box>
      }
    >
     {
      mailchimpExists === false && (
        <ManageMailchimp
        mailchimpExists={mailchimpExists}
        onDisconnect={handleDisconnectMailchimp}
        getAuthUrl={getMailchimpAuthUrl}
        onError={setError}
        onShowSuccess={showSuccess}
      />
      )
     }
     {
      mailchimpExists === true && isAudienceConfigured === false && (
        <CheckoutSession
        onFetchAudiences={fetchAudiences}
        onFetchSelectedAudience={fetchSelectedAudience}
        onSaveAudience={handleFirstAudienceSelection}
        onClearAudience={async () => {
          await clearAudienceSelection();
          await checkAudienceConfiguration();
        }}
        onError={setError}
        onShowSuccess={showSuccess}
      />
      )
     }
     {
      mailchimpExists === true && isAudienceConfigured === true && isPermissionConfigured === false && (
        <ManagePermission
        onGetAudienceStatus={getAudienceStatus}
        onSetAudienceStatus={async (status) => {
          console.log("CALLING SAT AUDIENCE STATUS")
          await setAudienceStatus(status);
          await checkPermissionConfiguration();
          // Complete onboarding after permission is set
          try {
            await completeOnboarding();
            setHasCompletedOnboarding(true);
            showSuccess("Setup complete! Welcome to your dashboard.");
          } catch (err) {
            console.error("Failed to mark onboarding as complete:", err);
          }
        }}
        onError={setError}
        onShowSuccess={showSuccess}
      />
      )
     }
    </ContextView>
    )
    
  }


  return (
    <ContextView
      title={getTitle()}
      brandIcon={BrandIcon}
      footerContent={
        <Box css={{ marginBottom: "medium" }}>
          Something wrong?{" "}
          <Link
            external
            href="mailto:info@connectto.app"
            target="_blank"
            type="secondary"
          >
            Contact support
          </Link>
        </Box>
      }
    >
      {showSuccessNotification && (
        <Box css={{ marginBottom: "medium"}}>
          <Banner
            type="default"
            title={successMessage}
            onDismiss={() => setShowSuccessNotification(false)}
          />
        </Box>
      )}

      <Box css={{ stack: "y", rowGap: "small" }}>
        {(mailchimpExists === null || isAudienceConfigured === null || hasCompletedOnboarding === null || isPermissionConfigured === null || planInfo === null) && (
          <Box css={{ 
            padding: "large",
            alignSelfX: "center",
            alignSelfY: "center"
          }}>
            <Spinner size="large" />
          </Box>
        )}
        
        {(mailchimpExists !== null && isAudienceConfigured !== null && hasCompletedOnboarding !== null && isPermissionConfigured !== null && planInfo !== null) && (
          <>
            {loading && <Inline>Loading...</Inline>}
            {error && <Inline tone="critical">Error: {error}</Inline>}

        
          <>
            {currentView === 'overview' && (
              <>
              
                { mailchimpExists === true && isAudienceConfigured === true && planInfo && planInfo.remainingSyncs < 101 && (
                  <UsageSection 
                  planInfo={planInfo} 
                  getPricingPageUrl={getPricingPageUrl}
                  accountId={userContext?.account?.id || ""}
                  />
                )}

                { true && (
                  <SyncingStatus 
                  isMailchimpConnected={mailchimpExists === true}
                  isAudienceConfigured={isAudienceConfigured === true}
                  isPermissionConfigured={isPermissionConfigured === true}
                />
                )}

                { true && (
                  <Box css={{
                    stack: "x",
                    distribute: "space-between",
                    alignY: "center",
                    padding: "medium",
                    background: "container",
                    borderRadius: "medium",
                  }}>
                    <Box css={{ stack: "y", rowGap: "small" }}>
                    <Inline css={{ font: 'body', fontWeight: 'semibold' }}>Connection</Inline>
                      <Inline css={{ font: 'caption' }}>
                        Connect and manage your Mailchimp integration.
                      </Inline>
                    </Box>
                    <Button
                      onPress={() => setCurrentView('mailchimp')}
                      type="secondary"
                      size="small"
                    >
                      <Icon css={{fill: "primary"}} name="arrowRight" />
                    </Button>
                  </Box>
                )}

                { mailchimpExists === true && (
                  <Box css={{
                    stack: "x",
                    // columnGap: "small",
                    distribute: "space-between",
                    alignY: "center",
                    padding: "medium",
                    background: "container",
                    borderRadius: "medium"
                  }}>
                    <Box css={{ stack: "y", rowGap: "small" }}>
                      <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
                        Audience
                      </Inline>
                      <Inline css={{ font: 'caption' }}>
                        Add or update your target Audience
                      </Inline>
                    </Box>
                    <Button
                      onPress={() => setCurrentView('checkout')}
                      type="secondary"
                      size="small"
                    >
                      <Icon name="arrowRight" />
                    </Button>
                  </Box>
                )}

                { planInfo && planInfo.planName !== "FREE" && (
                  <Box css={{
                    stack: "x",
                    distribute: "space-between",
                    alignY: "center",
                    padding: "medium",
                    background: "container",
                    borderRadius: "medium"
                  }}>
                    <Box css={{ stack: "y", rowGap: "small" }}>
                      <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
                        Subscription
                      </Inline>
                      <Inline css={{ font: 'caption' }}>
                        Update billing and manage your plan
                      </Inline>
                    </Box>
                    <Button
                      onPress={() => setCurrentView('subscription')}
                      type="secondary"
                      size="small"
                    >
                      <Icon name="arrowRight" />
                    </Button>
                  </Box>
                )}
                
                { true && (
                  <Box css={{
                    stack: "x",
                    distribute: "space-between",
                    alignY: "center",
                    padding: "medium",
                    background: "container",
                    borderRadius: "medium"
                  }}>
                    <Box css={{ stack: "y", rowGap: "small" }}>
                      <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
                        Metrics
                      </Inline>
                      <Inline css={{ font: 'caption' }}>
                        See your monthly sync usage
                      </Inline>
                    </Box>
                    <Button
                      onPress={() => setCurrentView('metrics')}
                      type="secondary"
                      size="small"
                    >
                      <Icon name="arrowRight" />
                    </Button>
                  </Box>
                )}

                { mailchimpExists === true && (
                  <Box css={{
                    stack: "x",
                    distribute: "space-between",
                    alignY: "center",
                    padding: "medium",
                    background: "container",
                    borderRadius: "medium"
                  }}>
                    <Box css={{ stack: "y", rowGap: "small" }}>
                      <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
                        Pending Contacts
                      </Inline>
                      <Inline css={{ font: 'caption' }}>
                        Get pending contacts (check console)
                      </Inline>
                    </Box>
                    <Button
                      onPress={handleGetPendingContacts}
                      type="secondary"
                      size="small"
                    >
                      Get Data
                    </Button>
                  </Box>
                )}


                {/* {planInfo && <UsageSection 
                  planInfo={planInfo} 
                  getPricingPageUrl={getPricingPageUrl}
                  accountId={userContext?.account?.id || ""}
                />} */}

                {/* <SyncingStatus 
                  isMailchimpConnected={mailchimpExists === true}
                  isAudienceConfigured={isAudienceConfigured}
                /> */}
{/* 
                <DashboardOverview
                  planName={planInfo?.planName || ""}
                  onNavigateToCheckout={() => setCurrentView('checkout')}
                  onNavigateToSubscription={() => setCurrentView('subscription')}
                  onNavigateToMailchimp={() => setCurrentView('mailchimp')}
                /> */}
              </>
            )}

            {currentView === 'checkout' && (
              <>
              <Box css={{marginBottom: "medium"}}>
              <Button
                  onPress={() => setCurrentView('overview')}
                  type="secondary"
                  size="small"
                >
                  ← Back
                </Button>
              </Box>
                <CheckoutSession
                  onFetchAudiences={fetchAudiences}
                  onFetchSelectedAudience={fetchSelectedAudience}
                  onSaveAudience={async (audienceId: string) => {
                    await saveSelectedAudience(audienceId);
                    await checkAudienceConfiguration();
                  }}
                  onClearAudience={async () => {
                    await clearAudienceSelection();
                    await checkAudienceConfiguration();
                  }}
                  onError={setError}
                  onShowSuccess={showSuccess}
                />
                <ManagePermission
                  onGetAudienceStatus={getAudienceStatus}
                  onSetAudienceStatus={async (status: string) => {
                    await setAudienceStatus(status);
                    await checkPermissionConfiguration();
                  }}
                  onError={setError}
                  onShowSuccess={showSuccess}
                />
              </>
            )}

            {currentView === 'subscription' && (
              <>
              <Box css={{marginBottom: "medium"}}>
                <Button
                  onPress={() => setCurrentView('overview')}
                  type="secondary"
                  size="small"
                >
                  ← Back
                </Button>
                </Box>
                <SubscriptionManagement
                  planInfo={planInfo}
                  onFetchPortalUrl={fetchCustomerPortalUrl}
                  onError={setError}
                />
              </>
            )}

            {currentView === 'mailchimp' && (
              <>
              <Box css={{marginBottom: "medium"}}>
              <Button
                  onPress={() => setCurrentView('overview')}
                  type="secondary"
                  size="small"
                >
                  ← Back
                </Button>
              </Box>
                <ManageMailchimp
                  mailchimpExists={mailchimpExists === true}
                  onDisconnect={handleDisconnectMailchimp}
                  getAuthUrl={getMailchimpAuthUrl}
                  onError={setError}
                  onShowSuccess={showSuccess}
                />
              </>
            )}

            {currentView === 'metrics' && (
              <>
              <Box css={{marginBottom: "medium"}}>
              <Button
                  onPress={() => setCurrentView('overview')}
                  type="secondary"
                  size="small"
                >
                  ← Back
                </Button>
              </Box>
                <MetricsView
                  onFetchUsage={fetchUsage}
                  onError={setError}
                  planInfo={planInfo}
                  getPricingPageUrl={getPricingPageUrl}
                  accountId={userContext?.account?.id || ""}
                />
              </>
            )}
          </>
        {/* )} */}
          </>
        )}
      </Box>
    </ContextView>
  );
};

export default Home;
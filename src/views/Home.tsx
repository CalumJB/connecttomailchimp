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
import { Upgrade } from "./components/Upgrade";
import { Subscribe } from "./components/Subscribe";
import { SubscriptionManagement } from "./components/SubscriptionManagement";
import { ManageAudience } from "./components/ManageAudience";
import { ManageMailchimp } from "./components/ManageMailchimp";
import { Status } from "./components/Status";
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
  const [audience, setAudience] = useState<string | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [permissions, setPermissions] = useState<string | null>(null);
  const [pendingContactsLoading, setPendingContactsLoading] = useState(false);

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
    disconnectMailchimp,
    getMailchimpAuthUrl,
    getPricingPageUrl,
    completeOnboarding,
    checkOnboardingStatus,
    fetchUsage,
    fetchPermissionStatus,
    savePermissionStatus,
    getPendingContacts,
  } = useApi(userContext);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessNotification(true);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 3000);
  };
  const logSuccess = (message: string) => {
    console.log(message)
  };


  const handleDisconnectMailchimp = async () => {
    try {
      await disconnectMailchimp();
      setMailchimpExists(false);
      setCurrentView('overview');
      showSuccess("Mailchimp disconnected successfully");
    } catch (err) {
      setError((err as Error).message || "Failed to disconnect Mailchimp");
    }
  };

  const handleGetPendingContacts = async () => {
    setPendingContactsLoading(true);
    try {
      const response = await getPendingContacts();
      showSuccess("Check console for pending contacts data");
    } catch (err) {
      console.error("Failed to get pending contacts:", err);
      setError((err as Error).message || "Failed to get pending contacts");
    } finally {
      setPendingContactsLoading(false);
    }
  };

  const getTitle = () => {
    if (hasCompletedOnboarding === false && mailchimpExists === false) {
      return 'Getting started';
    }
    if (hasCompletedOnboarding === false && mailchimpExists === true && (audience === null || audience === "")) {
      return 'Getting started';
    }
    if (hasCompletedOnboarding === false && mailchimpExists === true && audience && audience !== "" && (permissions === null || permissions === "")) {
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
      setAudience(selectedId || "");
    } catch (err) {
      console.error("Failed to check audience configuration:", err);
      setAudience("");
    }
  };

  const checkPermissionConfiguration = async () => {
    try {
      const statusData = await fetchPermissionStatus();
      const currentStatus = statusData.audience_status || "";
      setPermissions(currentStatus);
    } catch (err) {
      console.error("Failed to check permission configuration:", err);
      setPermissions("");
    }
  };

  useEffect(() => {
    const initializeApp = async () => {
      setError(null);
      setMailchimpExists(null);
      setShowFreeDashboard(false);
      setCurrentView('overview');
      setAudience(null);
      setHasCompletedOnboarding(null);
      setPermissions(null);

      try {
        await createUser();

        // Check onboarding status first, default to true if failed
        try {
          const onboardingStatus = await checkOnboardingStatus();
          const isCompleted = Boolean(onboardingStatus?.completed);
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
          setAudience("");
          setPermissions("");
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

  if(hasCompletedOnboarding === false && (mailchimpExists === false || audience === null || audience === "" || permissions === null || permissions === "")){
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
        onShowSuccess={logSuccess}
      />
      )
     }
     {
      mailchimpExists === true && (audience === null || audience === "") && (
        <ManageAudience
        onFetchAudiences={fetchAudiences}
        onFetchSelectedAudience={fetchSelectedAudience}
        onSaveAudience={async (audienceId: string) => {
          await saveSelectedAudience(audienceId);
          await checkAudienceConfiguration();
        }}
        onError={setError}
        onShowSuccess={logSuccess}
      />
      )
     }
     {
      mailchimpExists === true && audience && audience !== "" && (permissions === null || permissions === "") && (
        <ManagePermission
        onFetchPermissionStatus={fetchPermissionStatus}
        onSavePermissionStatus={async (status) => {
          await savePermissionStatus(status);
          await checkPermissionConfiguration();
          // Complete onboarding after permission is set
          try {
            await completeOnboarding();
            setHasCompletedOnboarding(true);
            // showSuccess("Setup complete! Welcome to your dashboard.");
          } catch (err) {
            console.error("Failed to mark onboarding as complete:", err);
          }
        }}
        onError={setError}
        onShowSuccess={logSuccess}
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
        {(mailchimpExists === null || audience === null || hasCompletedOnboarding === null || permissions === null || planInfo === null) && (
          <Box css={{ 
            padding: "large",
            alignSelfX: "center",
            alignSelfY: "center"
          }}>
            <Spinner size="large" />
          </Box>
        )}
        
        {(mailchimpExists !== null && audience !== null && hasCompletedOnboarding !== null && permissions !== null && planInfo !== null) && (
          <>
            {loading && <Inline>Loading...</Inline>}
            {/* {error && <Inline tone="critical">Error: {error}</Inline>} */}

        
          <>
            {currentView === 'overview' && (
              <>
                { planInfo.planName === "NONE" ? (
                  <Subscribe 
                    getPricingPageUrl={getPricingPageUrl}
                    accountId={userContext?.account?.id || ""}
                  />
                ) : (
                  <>
                    {/* { mailchimpExists === true && audience && audience !== "" && planInfo && planInfo.remainingSyncs < 50 && (
                      <Upgrade 
                      planInfo={planInfo} 
                      getPricingPageUrl={getPricingPageUrl}
                      accountId={userContext?.account?.id || ""}
                      />
                    )} */}

                    { true && (
                      <Status
                      isMailchimpConnected={mailchimpExists === true}
                      audience={audience}
                      permissions={permissions}
                      onFetchUsage={fetchUsage}
                      onError={setError}
                      planInfo={planInfo}
                      getPricingPageUrl={getPricingPageUrl}
                      accountId={userContext?.account?.id || ""}
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
                            Manage your Mailchimp integration.
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
                            Add or update your target Audience.
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
                            Subscription
                          </Inline>
                          <Inline css={{ font: 'caption' }}>
                            Update billing and manage your plan.
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
                  </>
                )}
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
                <ManageAudience
                  onFetchAudiences={fetchAudiences}
                  onFetchSelectedAudience={fetchSelectedAudience}
                  onSaveAudience={async (audienceId: string) => {
                    await saveSelectedAudience(audienceId);
                    await checkAudienceConfiguration();
                  }}
                  onError={setError}
                  onShowSuccess={showSuccess}
                />
                <ManagePermission
                  onFetchPermissionStatus={fetchPermissionStatus}
                  onSavePermissionStatus={async (status: string) => {
                    await savePermissionStatus(status);
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
                  getPricingPageUrl={getPricingPageUrl}
                  accountId={userContext?.account?.id || ""}
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
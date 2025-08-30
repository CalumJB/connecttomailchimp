import {
  Box,
  ContextView,
  Link,
  Banner,
  Inline,
  Button
} from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import React, { useState, useEffect } from "react";

import BrandIcon from "./connecttostripe.svg";
import { useApi } from "./hooks/useApi";
import { PlanInfoSection } from "./components/PlanInfoSection";
import { UsageSection } from "./components/UsageSection";
import { SubscriptionManagement } from "./components/SubscriptionManagement";
import { MailchimpConnection } from "./components/MailchimpConnection";
import { CheckoutSession } from "./components/CheckoutSession";
import { ManageMailchimp } from "./components/ManageMailchimp";
import { DashboardOverview } from "./components/DashboardOverview";

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
  const [currentView, setCurrentView] = useState<'overview' | 'checkout' | 'subscription' | 'mailchimp'>('overview');

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
      setShowFreeDashboard(false);
      setCurrentView('overview');
      showSuccess("Mailchimp disconnected successfully");
    } catch (err) {
      setError((err as Error).message || "Failed to disconnect Mailchimp");
    }
  };

  const getTitle = () => {
    if (mailchimpExists === false) {
      return 'Getting started';
    }
    if (mailchimpExists === true && planInfo?.planName === "FREE" && !showFreeDashboard) {
      return 'Subscribe';
    }
    if (currentView === 'checkout') {
      return 'Checkout Session';
    }
    if (currentView === 'subscription') {
      return 'Manage Subscription';
    }
    if (currentView === 'mailchimp') {
      return 'Manage Mailchimp';
    }
    return 'Configure';
  };


  useEffect(() => {
    const initializeApp = async () => {
      setError(null);
      setMailchimpExists(null);
      setShowFreeDashboard(false);
      setCurrentView('overview');

      try {
        await createUser();

        const [mailchimpResponse, planData] = await Promise.all([
          checkMailchimpUser(),
          fetchPlanInfo().catch(err => {
            console.error("Failed to fetch plan info:", err);
            return null;
          })
        ]);

        if (mailchimpResponse.exists) {
          console.log(JSON.stringify(mailchimpResponse))
          setMailchimpExists(true);
        } else {
          setMailchimpExists(false);
        }

        if (planData) {
          setPlanInfo(planData);
        }
      } catch (err) {
        setError((err as Error).message || "Unknown error");
      }
    };

    initializeApp();
  }, [userContext?.id, userContext?.account?.id]);

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
        <Box css={{ stack: "y", rowGap: "medium" }}>
          <Banner
            type="default"
            title={successMessage}
            onDismiss={() => setShowSuccessNotification(false)}
          />
        </Box>
      )}

      <Box css={{ stack: "y", rowGap: "small" }}>
        {loading && <Inline>Loading...</Inline>}
        {error && <Inline tone="critical">Error: {error}</Inline>}

        {/* Not connected to Mailchimp - Show only welcome and connect sections */}
        {mailchimpExists === false && (
          <MailchimpConnection
            getAuthUrl={getMailchimpAuthUrl}
          />
        )}

        {/* Connected but not subscribed - Show subscribe section or continue free */}
        {mailchimpExists === true && planInfo?.planName === "FREE" && !showFreeDashboard && (
          <PlanInfoSection 
            planInfo={planInfo} 
            getPricingPageUrl={getPricingPageUrl}
            accountId={userContext?.account?.id || ""}
            onContinueFree={() => setShowFreeDashboard(true)}
          />
        )}

        {/* Connected, free plan, showing limited dashboard */}
        {mailchimpExists === true && planInfo?.planName === "FREE" && showFreeDashboard && (
          <>
            {currentView === 'overview' && (
              <>
                {planInfo && <UsageSection 
                  planInfo={planInfo} 
                  getPricingPageUrl={getPricingPageUrl}
                  accountId={userContext?.account?.id || ""}
                />}

                <DashboardOverview
                  planName={planInfo?.planName || "FREE"}
                  onNavigateToCheckout={() => setCurrentView('checkout')}
                  onNavigateToSubscription={() => setCurrentView('subscription')}
                  onNavigateToMailchimp={() => setCurrentView('mailchimp')}
                />
              </>
            )}

            {currentView === 'checkout' && (
              <>
                <Button
                  onPress={() => setCurrentView('overview')}
                  type="secondary"
                  size="small"
                  css={{ marginBottom: "medium" }}
                >
                  ← Back
                </Button>
                <CheckoutSession
                  onFetchAudiences={fetchAudiences}
                  onFetchSelectedAudience={fetchSelectedAudience}
                  onSaveAudience={saveSelectedAudience}
                  onClearAudience={clearAudienceSelection}
                  onError={setError}
                  onShowSuccess={showSuccess}
                />
              </>
            )}

            {currentView === 'mailchimp' && (
              <>
                <Button
                  onPress={() => setCurrentView('overview')}
                  type="secondary"
                  size="small"
                  css={{ marginBottom: "medium" }}
                >
                  ← Back
                </Button>
                <ManageMailchimp
                  onDisconnect={handleDisconnectMailchimp}
                  onError={setError}
                  onShowSuccess={showSuccess}
                />
              </>
            )}
          </>
        )}

        {/* Connected and subscribed - Show full dashboard */}
        {mailchimpExists === true && planInfo?.planName !== "FREE" && (
          <>
            {currentView === 'overview' && (
              <>
                {planInfo && <UsageSection 
                  planInfo={planInfo} 
                  getPricingPageUrl={getPricingPageUrl}
                  accountId={userContext?.account?.id || ""}
                />}

                <DashboardOverview
                  planName={planInfo?.planName || ""}
                  onNavigateToCheckout={() => setCurrentView('checkout')}
                  onNavigateToSubscription={() => setCurrentView('subscription')}
                  onNavigateToMailchimp={() => setCurrentView('mailchimp')}
                />
              </>
            )}

            {currentView === 'checkout' && (
              <>
                <Button
                  onPress={() => setCurrentView('overview')}
                  type="secondary"
                  size="small"
                  css={{ marginBottom: "medium" }}
                >
                  ← Back
                </Button>
                <CheckoutSession
                  onFetchAudiences={fetchAudiences}
                  onFetchSelectedAudience={fetchSelectedAudience}
                  onSaveAudience={saveSelectedAudience}
                  onClearAudience={clearAudienceSelection}
                  onError={setError}
                  onShowSuccess={showSuccess}
                />
              </>
            )}

            {currentView === 'subscription' && (
              <>
                <Button
                  onPress={() => setCurrentView('overview')}
                  type="secondary"
                  size="small"
                  css={{ marginBottom: "medium" }}
                >
                  ← Back
                </Button>
                <SubscriptionManagement
                  planName={planInfo?.planName}
                  onFetchPortalUrl={fetchCustomerPortalUrl}
                  onError={setError}
                />
              </>
            )}

            {currentView === 'mailchimp' && (
              <>
                <Button
                  onPress={() => setCurrentView('overview')}
                  type="secondary"
                  size="small"
                  css={{ marginBottom: "medium" }}
                >
                  ← Back
                </Button>
                <ManageMailchimp
                  onDisconnect={handleDisconnectMailchimp}
                  onError={setError}
                  onShowSuccess={showSuccess}
                />
              </>
            )}
          </>
        )}
      </Box>
    </ContextView>
  );
};

export default Home;
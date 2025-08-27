import {
  Box,
  ContextView,
  Button,
  Inline,
  Link,
  Select,
  Banner,
  Badge,
  Icon
} from "@stripe/ui-extension-sdk/ui";
import React from 'react'
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import { fetchStripeSignature } from "@stripe/ui-extension-sdk/utils";


import BrandIcon from "./connecttostripe.svg";
import { useState, useEffect, useCallback } from "react";

const isDev = true; // REMEMBER TO CHANGE ME

const getBaseUrl = () => {
  return isDev 
    ? "http://localhost:8080/api" // Demo url
    : "https://api.connectto.app/api"; // Prod url
};

const getMailchimpClientId = () => {
  return isDev 
    ? "386657553310" // Demo client ID
    : "556139323126"; // Production client ID
};

const getPricingPage = () => {
  return isDev
  ? "https://www.connectto.app/demo-pricing"
  : "'"
}


interface MailchimpAudience {
  id: string;
  name: string;
  member_count: number;
}

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audiences, setAudiences] = useState<MailchimpAudience[]>([]);
  const [selectedAudienceId, setSelectedAudienceId] = useState<string>("");
  const [originalAudienceId, setOriginalAudienceId] = useState<string>("");
  const [audiencesLoading, setAudiencesLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [showConfirmDisconnect, setShowConfirmDisconnect] = useState(false);
  const [disconnectLoading, setDisconnectLoading] = useState(false);
  const [showManageSection, setShowManageSection] = useState(false);
  const [showReloadButton, setShowReloadButton] = useState(false);
  const [planInfo, setPlanInfo] = useState<PlanInfo | null>(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [customerPortalUrl, setCustomerPortalUrl] = useState<string | null>(null);
  const [customerPortalLoading, setCustomerPortalLoading] = useState(false);

  const handleApiError = async (response: Response, fallbackMessage: string) => {
    if (!response.ok) {
      const errorText = await response.text();
      if ((response.status === 401 || response.status === 403) && 
          (errorText.toLowerCase().includes('mailchimp'))) {
        throw new Error("There's an issue with your Mailchimp account. You may need to reconnect your Mailchimp account.");
      }
      throw new Error(fallbackMessage);
    }
  };

  const createUser = async () => {
    setError(null); // Clear any previous errors
    const signature = await fetchStripeSignature();

    const response = await fetch(`${getBaseUrl()}/stripe/create`, {
      method: "POST",
      headers: {
        "Stripe-Signature": signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userContext?.id,
        account_id: userContext?.account?.id,
      }),
    });

    await handleApiError(response, "Failed to create user");

    return await response.json();
  };

  const checkMailchimpUser = async () => {
    setError(null); // Clear any previous errors
    const signature = await fetchStripeSignature();

    const response = await fetch(`${getBaseUrl()}/stripe/account/mailchimp`, {
      method: "POST",
      headers: {
        "Stripe-Signature": signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userContext?.id,
        account_id: userContext?.account?.id,
      }),
    });

    await handleApiError(response, "Failed to fetch Mailchimp user");

    return await response.json();
  };

  const fetchAudiences = useCallback(async () => {
    const signature = await fetchStripeSignature();

    const response = await fetch(`${getBaseUrl()}/mailchimp/user/checkout/audiences`, {
      method: "POST",
      headers: {
        "Stripe-Signature": signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userContext?.id,
        account_id: userContext?.account?.id,
      }),
    });

    await handleApiError(response, "Failed to fetch audiences");

    const data = await response.json();
    return data.lists || [];
  }, [userContext?.id, userContext?.account?.id]);

  const fetchSelectedAudience = useCallback(async () => {
    const signature = await fetchStripeSignature();

    const response = await fetch(`${getBaseUrl()}/mailchimp/user/checkout/audience/selected`, {
      method: "POST",
      headers: {
        "Stripe-Signature": signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userContext?.id,
        account_id: userContext?.account?.id,
      }),
    });

    await handleApiError(response, "Failed to fetch selected audience");

    const data = await response.json();
    return data.selected_audience_id || "";
  }, [userContext?.id, userContext?.account?.id]);

  const saveSelectedAudience = async (audienceId: string) => {
    setError(null); // Clear any previous errors
    const signature = await fetchStripeSignature();

    const response = await fetch(`${getBaseUrl()}/mailchimp/user/checkout/audience/select`, {
      method: "PUT",
      headers: {
        "Stripe-Signature": signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userContext?.id,
        account_id: userContext?.account?.id,
        audience_id: audienceId,
      }),
    });

    await handleApiError(response, "Failed to save selected audience");

    // Check if response contains JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // Return the text response if it's not JSON
      const text = await response.text();
      return { message: text };
    }
  };

  const clearAudienceSelection = async () => {
    setError(null); // Clear any previous errors
    const signature = await fetchStripeSignature();

    const response = await fetch(`${getBaseUrl()}/mailchimp/user/checkout/audience/select`, {
      method: "DELETE",
      headers: {
        "Stripe-Signature": signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userContext?.id,
        account_id: userContext?.account?.id,
      }),
    });

    await handleApiError(response, "Failed to clear audience selection");

    // Check if response contains JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // Return the text response if it's not JSON
      const text = await response.text();
      return { message: text };
    }
  };

  const fetchPlanInfo = async () => {
    setError(null);
    const signature = await fetchStripeSignature();

    const response = await fetch(`${getBaseUrl()}/user/plan-info`, {
      method: "POST",
      headers: {
        "Stripe-Signature": signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userContext?.id,
        account_id: userContext?.account?.id,
      }),
    });

    await handleApiError(response, "Failed to fetch plan info");

    return await response.json();
  };

  const fetchCustomerPortalUrl = async () => {
    setError(null);
    setCustomerPortalLoading(true);
    const signature = await fetchStripeSignature();

    try {
      const response = await fetch(`${getBaseUrl()}/user/customer-portal`, {
        method: "POST",
        headers: {
          "Stripe-Signature": signature,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userContext?.id,
          account_id: userContext?.account?.id,
        }),
      });

      await handleApiError(response, "Failed to fetch customer portal URL");

      const data = await response.json();
      setCustomerPortalUrl(data.url);
    } catch (err) {
      setError((err as Error).message || "Failed to fetch customer portal URL");
    } finally {
      setCustomerPortalLoading(false);
    }
  };

  const disconnectMailchimp = async () => {
    setError(null); // Clear any previous errors
    const signature = await fetchStripeSignature();

    const response = await fetch(`${getBaseUrl()}/oauth/mailchimp/disconnect`, {
      method: "DELETE",
      headers: {
        "Stripe-Signature": signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userContext?.id,
        account_id: userContext?.account?.id,
      }),
    });

    await handleApiError(response, "Failed to disconnect Mailchimp");

    // Check if response contains JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      // Return the text response if it's not JSON
      const text = await response.text();
      return { message: text };
    }
  };

  const loadAudienceData = useCallback(async () => {
    setAudiencesLoading(true);
    setError(null); // Clear any previous errors
    try {
      const [audiencesData, selectedId] = await Promise.all([
        fetchAudiences(),
        fetchSelectedAudience()
      ]);
      
      setAudiences(audiencesData);
      setSelectedAudienceId(selectedId);
      setOriginalAudienceId(selectedId);
    } catch (err) {
      console.error("Failed to load audience data:", err);
      setError((err as Error).message || "Failed to load audience data");
    }
    setAudiencesLoading(false);
  }, [fetchAudiences, fetchSelectedAudience]);

  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true);
      setError(null);
      setMailchimpExists(null);

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

      setLoading(false);
    };

    initializeApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext?.id, userContext?.account?.id]);

  useEffect(() => {
    if (mailchimpExists === true) {
      loadAudienceData();
    }
  }, [mailchimpExists, loadAudienceData]);

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      await saveSelectedAudience(selectedAudienceId);
      setOriginalAudienceId(selectedAudienceId);
      
      // Show success notification
      setShowSuccessNotification(true);
      
      // Auto-hide notification after 4 seconds
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 3000);
      
    } catch (err) {
      setError((err as Error).message || "Failed to save audience selection");
    }
    setSaveLoading(false);
  };

  const hasChanges = selectedAudienceId !== originalAudienceId;

  return (
    <ContextView
      title="Connect to Mailchimp"
      // brandColor="#0173E5"
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
            title={selectedAudienceId !== "" 
              ? "Syncing Enabled" 
              : "Syncing Disabled"
            }
            onDismiss={() => setShowSuccessNotification(false)}
          />
        </Box>
        )}
      

      <Box css={{ stack: "y", rowGap: "large" }}>
        

        {loading && <Inline>Loading...</Inline>}
        
        
        {error && <Inline>Error: {error}</Inline>}


        {planInfo && (
          <Box css={{ 
            stack: "y", 
            rowGap: "medium", 
            padding: "large",
            background: planInfo.planName === "free" ? "surface" : "container",
            borderRadius: "medium"
          }}>

            {planInfo.planName === "FREE" && (
              <Box css={{ stack: "y", rowGap: "small" }}>
                <Inline css={{ fontWeight: 'semibold'}}>
                  Welcome!
                </Inline>
                <Inline>
                  We’ve given you 20 free syncs this month so you can explore the app.
                </Inline>
                <Inline>
                  Subscribe anytime to unlock more syncs and keep your data flowing.
                </Inline>
                <Box css={{paddingTop: "small"}}>
                <Button 
                  href={`${getPricingPage()}?stripe_account_id=${userContext?.account?.id}`}
                  type="primary"
                  size="medium"
                  css={{width: "fill"}}
                >
                  Upgrade Now
                </Button>
                </Box>                
              </Box>

            )}

            </Box>
        )}

        {planInfo && (
          <Box css={{ 
            stack: "y", 
            rowGap: "medium", 
            padding: "large",
            background: planInfo.planName === "free" ? "surface" : "container",
            borderRadius: "medium"
          }}>

              <Box css={{ stack: "y", rowGap: "small" }}>
                <Box css={{ stack: "x", distribute: "space-between" }}>
                  <Inline>
                    {planInfo.currentMonthUsage} / {planInfo.monthlySyncLimit} syncs used
                  </Inline>
                  <Inline>
                    {planInfo.remainingSyncs} remaining
                  </Inline>
                </Box>
              </Box>

            {planInfo.planName !== "FREE" && (
              <Box css={{ stack: "y", rowGap: "small" }}>
                <Inline>
                  Upgrade to Pro for unlimited syncs and premium features.
                </Inline>
                <Button 
                  href={`${getPricingPage()}?stripe_account_id=${userContext?.account?.id}`}
                  type="primary"
                  size="medium"
                >
                  Upgrade Now
                  <Icon name="external"/>
                </Button>
              </Box>
            )}
          </Box>
        )}

        {planInfo && planInfo.planName !== "FREE" && (
          <Box css={{ 
            stack: "y", 
            rowGap: "medium", 
            padding: "large",
            background: "surface",
            borderRadius: "medium"
          }}>
            <Inline css={{font: 'heading', color: 'primary', fontWeight: 'semibold'}}>
              Manage Subscription
            </Inline>
            
            <Inline>
              Access your billing history, update payment methods, and manage your subscription.
            </Inline>

            {!customerPortalUrl ? (
              <Button 
                onPress={fetchCustomerPortalUrl}
                loading={customerPortalLoading}
                type="secondary"
                size="medium"
              >
                Get Management Link
              </Button>
            ) : (
              <Box css={{ stack: "y", rowGap: "small" }}>
                <Inline tone="positive">
                  Management link ready! Click below to open your customer portal.
                </Inline>
                <Button 
                  href={customerPortalUrl}
                  type="primary"
                  size="medium"
                  css={{width: "fill"}}
                >
                  Open Customer Portal
                  <Icon name="external"/>
                </Button>
              </Box>
            )}
          </Box>
        )}
        

        {mailchimpExists === true && (
          <Box css={{ stack: "y", rowGap: "medium" }}>
            <Box css={{ stack: "x", rowGap: "medium", distribute: "space-between", alignY: "center" }}>
            <Inline css={{font: 'heading', color: 'primary', fontWeight: 'semibold'}}>
              Checkout Session
            </Inline>
            
            {!audiencesLoading && (
              originalAudienceId !== "" ? (
                <Badge type="positive">Enabled</Badge>
              ) : (
                <Inline css={{ color: "critical"}}>
                  <Badge type="negative">Disabled</Badge>
                </Inline>
              )
            )}
            </Box>
            
            <Inline>
              When a new customer completes a Checkout Session their email will be added to the Mailchimp Audience with tag &apos;stripe&apos;.
            </Inline>
            {audiencesLoading ? (
              <Inline>Loading audiences...</Inline>
            ) : audiences.length === 0 ? (
              <Box css={{ stack: "y", rowGap: "small" }}>
                <Inline tone="neutral">
                  No audiences found in your Mailchimp account. You need to create at least one audience in Mailchimp before you can select one here.
                </Inline>
                <Link
                  href="https://mailchimp.com/help/create-audience/"
                  target="_blank"
                  rel="noopener noreferrer"
                  type="secondary"
                >
                  Learn how to create an audience in Mailchimp
                </Link>
              </Box>
            ) : (
              <>
                <Box css={{ stack: "y", rowGap: "small" }}>
                  <Inline css={{font: 'body', color: 'primary', fontWeight: "semibold"}}>Select Audience</Inline>
                <Box css={{ stack: "x", columnGap: "small"}}>
                  <Select
                    value={selectedAudienceId}
                    onChange={(event) => setSelectedAudienceId(event.target.value)}
                  >
                    <option value="">-- Select an audience --</option>
                    {audiences.map((audience) => (
                      <option key={audience.id} value={audience.id}>
                        {audience.name} ({audience.member_count} members)
                      </option>
                    ))}
                  </Select>
                  <Button 
                      onPress={loadAudienceData}
                      loading={audiencesLoading}
                      type="secondary"
                      size="medium"
                    >
                      <Icon name="refresh"/>
                    </Button>
                </Box>
                </Box>
                <Box css={{ stack: "y", rowGap: "medium" }}>
                <Box css={{ stack: "x", columnGap: "medium" }}>
                  <Button 
                    onPress={handleSave} 
                    loading={saveLoading}
                    disabled={!hasChanges}
                    type="primary"
                  >
                    Save Selection
                  </Button>
                  {originalAudienceId !== "" && !showConfirmClear && (
                    <Button
                      onPress={() => setShowConfirmClear(true)}
                      loading={saveLoading}
                      type="destructive"
                    >
                      Disable
                    </Button>
                  )}
                </Box>
                  {showConfirmClear && (
                    <Box css={{ stack: "y", rowGap: "small", padding: "medium", background: "container" }}>
                      <Inline css={{ fontWeight: "semibold" }}>
                        Are you sure you want to disabled?
                      </Inline>
                      <Inline>
                        This will stop syncing customer emails to Mailchimp.
                      </Inline>
                        <Box>
                        <Button 
                          onPress={async () => {
                            setSaveLoading(true);
                            try {
                              await clearAudienceSelection();
                              setSelectedAudienceId("");
                              setOriginalAudienceId("");
                              setShowConfirmClear(false);
                              
                              // Show success notification
                              setShowSuccessNotification(true);
                              setTimeout(() => {
                                setShowSuccessNotification(false);
                              }, 3000);
                              
                            } catch (err) {
                              setError((err as Error).message || "Failed to clear audience selection");
                            }
                            setSaveLoading(false);
                          }}
                          loading={saveLoading}
                          type="destructive"
                          size="small"
                        >
                          Confirm
                        </Button>
                        </Box>
                        <Box>
                        <Button 
                          onPress={() => setShowConfirmClear(false)}
                          type="secondary"
                          size="small"
                        >
                          Cancel
                        </Button>
                        </Box>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </Box>
        )}

{mailchimpExists === false && (
  <Box css={{ stack: "y", rowGap: "medium" }}>
    <Inline css={{font: 'heading', color: 'primary', fontWeight: 'semibold'}}>
Welcome
</Inline>
<Inline>
Connect your Mailchimp account and we&apos;ll start syncing your Stripe customers automatically.
</Inline>
<Inline/>



    {!showReloadButton ? (
      <Button
        href={(() => {
          const clientId = getMailchimpClientId();
          const redirectUri = `${getBaseUrl()}/oauth/mailchimp/callback`;
          const state = userContext?.account?.id || "";
          
          const params = new URLSearchParams({
            response_type: "code",
            client_id: clientId,
            redirect_uri: redirectUri,
            state: state
          });
          
          return `https://login.mailchimp.com/oauth2/authorize?${params.toString()}`;
        })()}
        type="primary"
        onPress={() => setShowReloadButton(true)}
        css={{
          width: "fill",
        }}
      >
        Connect to Mailchimp
      </Button>
    ) : (
      <Button
        onPress={async () => {
          setLoading(true);
          setError(null);
          try {
            const mailchimpResponse = await checkMailchimpUser();
            if (mailchimpResponse.exists) {
              setMailchimpExists(true);
            } else {
              setMailchimpExists(false);
            }
            setShowReloadButton(false);
          } catch (err) {
            setError((err as Error).message || "Unknown error");
          }
          setLoading(false);
        }}
        loading={loading}
        type="primary"
        css={{
          width: "fill",
        }}
      >
        Reload
      </Button>
    )}
  </Box>
)}

{mailchimpExists === true && (
  <Box css={{ stack: "y", rowGap: "medium" }}>
    <Box css={{ stack: "y", rowGap: "medium"}}>
      <Inline css={{font: 'heading', color: 'primary', fontWeight: 'semibold'}}>
        Manage Mailchimp
      </Inline>
      <Button 
        onPress={() => setShowManageSection(!showManageSection)}
        type="secondary"
        size="medium"
      >
        {showManageSection ? 'Hide' : 'Show' }
      </Button>
    </Box>
    
    {showManageSection && (
      <Box css={{ stack: "y", rowGap: "medium" }}>
        <Inline>
          Disconnect your Mailchimp account to stop all syncing and remove the integration.
        </Inline>

        <Box css={{ stack: "x", columnGap: "medium" }}>
          {!showConfirmDisconnect && (
            <Button 
              onPress={() => setShowConfirmDisconnect(true)}
              loading={disconnectLoading}
              type="destructive"
              size="medium"
            >
              Disconnect Mailchimp
            </Button>
          )}
        </Box>
        
        {showConfirmDisconnect && (
          <Box css={{ stack: "y", rowGap: "small", padding: "medium", background: "container" }}>
            <Inline css={{ fontWeight: "semibold" }}>
              Are you sure you want to disconnect Mailchimp?
            </Inline>
            <Inline>
              This will permanently remove the integration and stop all email syncing. You will need to reconnect if you want to use this service again.
            </Inline>
            <Box css={{ stack: "x", columnGap: "medium" }}>
              <Button 
                onPress={async () => {
                  setDisconnectLoading(true);
                  try {
                    await disconnectMailchimp();
                    setShowConfirmDisconnect(false);
                    setMailchimpExists(false);
                    setSelectedAudienceId("");
                    setOriginalAudienceId("");
                    setAudiences([]);
                    
                    // Show success notification
                    setShowSuccessNotification(true);
                    setTimeout(() => {
                      setShowSuccessNotification(false);
                    }, 3000);
                    
                  } catch (err) {
                    setError((err as Error).message || "Failed to disconnect Mailchimp");
                  }
                  setDisconnectLoading(false);
                }}
                loading={disconnectLoading}
                type="destructive"
                size="small"
              >
                Yes, Disconnect
              </Button>
              <Button 
                onPress={() => setShowConfirmDisconnect(false)}
                type="secondary"
                size="small"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    )}
  </Box>
)}
      </Box>
    </ContextView>
  );
};

export default Home;

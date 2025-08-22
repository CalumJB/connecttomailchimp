import {
  Box,
  ContextView,
  Button,
  Inline,
  Link,
  Select,
  Banner,
  Badge
} from "@stripe/ui-extension-sdk/ui";
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


interface MailchimpAudience {
  id: string;
  name: string;
  member_count: number;
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
  const [audienceError, setAudienceError] = useState<string | null>(null);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const createUser = async () => {
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

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return await response.json();
  };

  const checkMailchimpUser = async () => {
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

    if (!response.ok) {
      throw new Error("Failed to fetch Mailchimp user");
    }

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

    if (!response.ok) {
      throw new Error("Failed to fetch audiences");
    }

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

    if (!response.ok) {
      throw new Error("Failed to fetch selected audience");
    }

    const data = await response.json();
    return data.selected_audience_id || "";
  }, [userContext?.id, userContext?.account?.id]);

  const saveSelectedAudience = async (audienceId: string) => {
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

    if (!response.ok) {
      throw new Error("Failed to save selected audience");
    }

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

    if (!response.ok) {
      throw new Error("Failed to clear audience selection");
    }

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
    setAudienceError(null);
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
      setAudienceError((err as Error).message || "Failed to load audience data");
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

        const mailchimpResponse = await checkMailchimpUser();

        if (mailchimpResponse.exists) {
          console.log(JSON.stringify(mailchimpResponse))
          setMailchimpExists(true);
        } else {
          setMailchimpExists(false);
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
      title=""
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
        <Inline></Inline>
        </Box>
        )}
      

      <Box css={{ stack: "y", rowGap: "large" }}>
        {loading && <Inline>Loading...</Inline>}
        
        {error && <Inline tone="critical">Error: {error}</Inline>}
        
        

        {mailchimpExists === true && (
          <Box css={{ stack: "y", rowGap: "medium" }}>
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
            
            <Inline>
              When a new customer completes a Checkout Session their email will be added to the Mailchimp Audience with tag &apos;stripe&apos;.
            </Inline>
            {audiencesLoading ? (
              <Inline>Loading audiences...</Inline>
            ) : audienceError ? (
              <Box css={{ stack: "y", rowGap: "small" }}>
                <Inline tone="critical">
                  Error loading audiences: {audienceError}
                </Inline>
                <Button onPress={loadAudienceData} type="secondary" size="small">
                  Try Again
                </Button>
              </Box>
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
                <Select
                  label="Select Mailchimp Audience"
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
                <Box css={{ stack: "y", rowGap: "medium" }}>
                  <Box>
                  <Button 
                      onPress={handleSave} 
                      loading={saveLoading}
                      disabled={!hasChanges}
                      type="primary"
                    >
                      Save Selection
                    </Button>
                  </Box>
                  <Box>
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
      target="_blank"
      type="primary"
      css={{
        width: "fill",
      }}
    >
      Connect to Mailchimp ↗
    </Button>
  </Box>
)}
      </Box>
    </ContextView>
  );
};

export default Home;

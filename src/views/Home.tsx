import {
  Box,
  ContextView,
  Button,
  Inline,
  Link,
  Select,
} from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import { fetchStripeSignature } from "@stripe/ui-extension-sdk/utils";


import BrandIcon from "./brand_icon.svg";
import { useState, useEffect, useCallback } from "react";

interface MailchimpAudience {
  id: string;
  name: string;
  member_count: number;
}

const Home = ({ userContext, environment }: ExtensionContextValue) => {
  const [mailchimpExists, setMailchimpExists] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audiences, setAudiences] = useState<MailchimpAudience[]>([]);
  const [selectedAudienceId, setSelectedAudienceId] = useState<string>("");
  const [originalAudienceId, setOriginalAudienceId] = useState<string>("");
  const [audiencesLoading, setAudiencesLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [audienceError, setAudienceError] = useState<string | null>(null);

  const createUser = async () => {
    const signature = await fetchStripeSignature();

    const response = await fetch("http://localhost:8080/api/stripe/create", {
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

    const response = await fetch("http://localhost:8080/api/stripe/account/mailchimp", {
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

    const response = await fetch("http://localhost:8080/api/mailchimp/user/audiences", {
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

    const response = await fetch("http://localhost:8080/api/mailchimp/user/audience/selected", {
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

    const response = await fetch("http://localhost:8080/api/mailchimp/user/audience/select", {
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
    if (mailchimpExists === true) {
      loadAudienceData();
    }
  }, [mailchimpExists, loadAudienceData]);

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      await saveSelectedAudience(selectedAudienceId);
      setOriginalAudienceId(selectedAudienceId);
    } catch (err) {
      setError((err as Error).message || "Failed to save audience selection");
    }
    setSaveLoading(false);
  };

  const handleClick = async () => {
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

  const hasChanges = selectedAudienceId !== originalAudienceId;

  return (
    <ContextView
      title="Dashboard homepage"
      brandColor="#F6F8FA"
      brandIcon={BrandIcon}
      externalLink={{
        label: "Stripe Apps docs",
        href: "https://stripe.com/docs/stripe-apps",
      }}
      footerContent={
        <Box css={{ marginBottom: "medium" }}>
          Questions? Get help with your app from the{" "}
          <Link
            external
            href="https://stripe.com/docs/stripe-apps"
            target="_blank"
            type="secondary"
          >
            Stripe Apps docs
          </Link>
          ,{" "}
          <Link
            external
            href="https://support.stripe.com/"
            target="_blank"
            type="secondary"
          >
            Stripe Support
          </Link>
          , or the{" "}
          <Link
            external
            href="https://discord.com/invite/stripe"
            target="_blank"
            type="secondary"
          >
            Stripe Developers Discord
          </Link>
          .
        </Box>
      }
    >
      <Box css={{ stack: "y", rowGap: "large" }}>
        <Button onPress={handleClick} loading={loading}>
          Call Backend 5
        </Button>

        {error && <Inline tone="critical">Error: {error}</Inline>}

        {mailchimpExists === true && (
          <Box css={{ stack: "y", rowGap: "medium" }}>
            <Inline>
              Mailchimp user exists! Select your audience below:
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
                  {originalAudienceId === "" && <option value="">-- Select an audience --</option>}
                  {audiences.map((audience) => (
                    <option key={audience.id} value={audience.id}>
                      {audience.name} ({audience.member_count} members)
                    </option>
                  ))}
                </Select>
                
                <Button 
                  onPress={handleSave} 
                  loading={saveLoading}
                  disabled={!hasChanges}
                  type="primary"
                >
                  Save Selection
                </Button>
              </>
            )}
          </Box>
        )}

{mailchimpExists === false && (
  <Box css={{ stack: "y", rowGap: "medium" }}>
    <Inline>
      Here I need to show the option that will redirect the user to Mailchimp.
    </Inline>

    <Link
      href={(() => {
        const clientId = "386657553310";
        const redirectUri = "http://127.0.0.1:8080/api/oauth/mailchimp/callback";
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
      rel="noopener noreferrer"
      type="primary"
    >
      Connect Mailchimp
    </Link>
  </Box>
)}
      </Box>
    </ContextView>
  );
};

export default Home;

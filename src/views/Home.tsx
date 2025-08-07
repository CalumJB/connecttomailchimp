import {
  Box,
  ContextView,
  Button,
  Inline,
  Link,
} from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import { fetchStripeSignature } from "@stripe/ui-extension-sdk/utils";


import BrandIcon from "./brand_icon.svg";
import { useState } from "react";

const Home = ({ userContext, environment }: ExtensionContextValue) => {
  const [mailchimpExists, setMailchimpExists] = useState<boolean | null>(null);
  const [mailchimpData, setMailchimpData] = useState<{ stripeAccountId?: string; mailchimpAccountId?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

const startMailchimpOAuth = async () => {
  const signature = await fetchStripeSignature();

  const response = await fetch("http://localhost:8080/api/oauth/mailchimp/start", {
    method: "POST",
    headers: {
      "Stripe-Signature": signature,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stripeUserId: userContext?.id,
      stripeAccountId: userContext?.account?.id,
      state: userContext?.account?.id
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to start Mailchimp OAuth flow: ${errorText}`);
  }

  const data = await response.json();
  if (data && data.redirectUrl) {
    setRedirectUrl(data.redirectUrl);  // store the URL in state
  } else {
    throw new Error("Did not receive a redirect URL from the backend.");
  }
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

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setMailchimpExists(null);
    setMailchimpData(null);

    try {
      await createUser();

      const mailchimpResponse = await checkMailchimpUser();

      if (mailchimpResponse.exists) {
        setMailchimpExists(true);
        setMailchimpData({
          stripeAccountId: mailchimpResponse.stripeAccountId,
          mailchimpAccountId: mailchimpResponse.mailchimpAccountId,
        });
      } else {
        setMailchimpExists(false);
      }
    } catch (err) {
      setError((err as Error).message || "Unknown error");
    }

    setLoading(false);
  };

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
          Call Backend 4
        </Button>

        {error && <Inline tone="critical">Error: {error}</Inline>}

        {mailchimpExists === true && mailchimpData && (
          <Box>
            <Inline>
              Mailchimp user exists! <br />
              Stripe Account ID: {mailchimpData.stripeAccountId} <br />
            </Inline>
          </Box>
        )}

{mailchimpExists === false && (
  <Box css={{ stack: "y", rowGap: "medium" }}>
    <Inline>
      Here I need to show the option that will redirect the user to Mailchimp.
    </Inline>

    {!redirectUrl ? (
      <Button
        type="primary"
        onPress={async () => {
          setError(null);
          setLoading(true);
          try {
            await startMailchimpOAuth();
            setLoading(false); // loading done, now show link
          } catch (err) {
            setError((err as Error).message);
            setLoading(false);
          }
        }}
        loading={loading}
      >
        Connect Mailchimp
      </Button>
    ) : (
      // Show the user a link to click to continue the OAuth
      <Link
        href={redirectUrl}
        target="_self" // open in same tab
        rel="noopener noreferrer"
        type="primary"
      >
        Click here to connect Mailchimp
      </Link>
    )}
  </Box>
)}
      </Box>
    </ContextView>
  );
};

export default Home;

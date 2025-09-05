import { useState } from 'react';
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import { fetchStripeSignature } from "@stripe/ui-extension-sdk/utils";

const isDev = false; // REMEMBER TO CHANGE ME

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
  : "https://www.connectto.app/pricing"
}

interface PlanInfo {
  planName: string;
  planDisplayName: string;
  monthlySyncLimit: number;
  currentMonthUsage: number;
  remainingSyncs: number;
  status: string;
}

interface MailchimpAudience {
  id: string;
  name: string;
  member_count: number;
}

export const useApi = (userContext: ExtensionContextValue['userContext']) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const fetchPlanInfo = async (): Promise<PlanInfo> => {
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

  const fetchCustomerPortalUrl = async (): Promise<string> => {
    const signature = await fetchStripeSignature();

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
    return data.url;
  };

  const fetchAudiences = async (): Promise<MailchimpAudience[]> => {
    const signature = await fetchStripeSignature();

    const response = await fetch(`${getBaseUrl()}/mailchimp/user/audiences`, {
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
  };

  const fetchSelectedAudience = async (): Promise<string> => {
    const signature = await fetchStripeSignature();

    const response = await fetch(`${getBaseUrl()}/mailchimp/user/audience/get`, {
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
  };

  const saveSelectedAudience = async (audienceId: string) => {
    const signature = await fetchStripeSignature();

    const response = await fetch(`${getBaseUrl()}/mailchimp/user/audience/post`, {
      method: "POST",
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
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      return { message: text };
    }
  };

  const clearAudienceSelection = async () => {
    const signature = await fetchStripeSignature();

    const response = await fetch(`${getBaseUrl()}/mailchimp/user/audience/delete`, {
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
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      return { message: text };
    }
  };

  const disconnectMailchimp = async () => {
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
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      return { message: text };
    }
  };

  const getMailchimpAuthUrl = () => {
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
  };

  const getPricingPageUrl = (accountId: string) => {
    return `${getPricingPage()}?stripe_account_id=${accountId}`;
  };

  const completeOnboarding = async () => {
    const signature = await fetchStripeSignature();
    const response = await fetch(`${getBaseUrl()}/mailchimp/onboarding/complete`, {
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
      await handleApiError(response, "Failed to mark onboarding as complete");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      return { message: text };
    }
  };

  const checkOnboardingStatus = async () => {
    const signature = await fetchStripeSignature();
    const response = await fetch(`${getBaseUrl()}/mailchimp/onboarding/is-completed`, {
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
      await handleApiError(response, "Failed to check onboarding status");
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const result = await response.text();
      return { completed: result === "true" };
    }
  };

  const fetchUsage = async () => {
    const signature = await fetchStripeSignature();
    const response = await fetch(`${getBaseUrl()}/user/usage`, {
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

    await handleApiError(response, "Failed to fetch usage data");
    return await response.json();
  };

  const fetchPermissionStatus = async () => {
    const signature = await fetchStripeSignature();
    const response = await fetch(`${getBaseUrl()}/mailchimp/user/status/get`, {
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

    await handleApiError(response, "Failed to fetch permission status");
    return await response.json();
  };

  const savePermissionStatus = async (status: string) => {
    const signature = await fetchStripeSignature();
    const response = await fetch(`${getBaseUrl()}/mailchimp/user/status/post`, {
      method: "POST",
      headers: {
        "Stripe-Signature": signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userContext?.id,
        account_id: userContext?.account?.id,
        audience_status: status,
      }),
    });

    await handleApiError(response, "Failed to save permission status");
    return await response.json();
  };

  const clearPermissionStatus = async () => {
    const signature = await fetchStripeSignature();
    const response = await fetch(`${getBaseUrl()}/mailchimp/user/status/delete`, {
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

    await handleApiError(response, "Failed to clear permission status");
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      const text = await response.text();
      return { message: text };
    }
  };

  const getPendingContacts = async () => {
    const signature = await fetchStripeSignature();
    const response = await fetch(`${getBaseUrl()}/mailchimp/user/get-pending-contacts`, {
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

    await handleApiError(response, "Failed to get pending contacts");
    return await response.json();
  };

  return {
    loading,
    error,
    setError,
    setLoading,
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
    fetchPermissionStatus,
    savePermissionStatus,
    clearPermissionStatus,
    getPendingContacts,
  };
};
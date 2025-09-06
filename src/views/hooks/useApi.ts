import { useState } from 'react';
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import { fetchStripeSignature } from "@stripe/ui-extension-sdk/utils";

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

const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {

      lastError = error as Error;
      
      // Don't retry on client errors (4xx) except for rate limiting (429)
      if (error instanceof Error && error.message.includes('401') || 
          error.message.includes('403') || error.message.includes('404')) {
        throw error;
      }
      
      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        console.log("Retry attempts failed.")
        throw lastError;
      }
      
      // Wait with exponential backoff before retrying
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));

      console.log("Retrying.")
    }
  }
  console.log("Retry attempts failed.")
  throw lastError!;
};

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
    return withRetry(async () => {
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
    });
  };

  const checkMailchimpUser = async () => {
    return withRetry(async () => {
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
    });
  };

  const fetchPlanInfo = async (): Promise<PlanInfo> => {
    return withRetry(async () => {
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
    });
  };

  const fetchCustomerPortalUrl = async (): Promise<string> => {
    return withRetry(async () => {
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
    });
  };

  const fetchAudiences = async (): Promise<MailchimpAudience[]> => {
    return withRetry(async () => {
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
    });
  };

  const fetchSelectedAudience = async (): Promise<string> => {
    return withRetry(async () => {
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
    });
  };

  const saveSelectedAudience = async (audienceId: string) => {
    return withRetry(async () => {
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
    });
  };

  const clearAudienceSelection = async () => {
    return withRetry(async () => {
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
    });
  };

  const disconnectMailchimp = async () => {
    return withRetry(async () => {
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
    });
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
    return withRetry(async () => {
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
    });
  };

  const checkOnboardingStatus = async () => {
    return withRetry(async () => {
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
    });
  };

  const fetchUsage = async () => {
    return withRetry(async () => {
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
    });
  };

  const fetchPermissionStatus = async () => {
    return withRetry(async () => {
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
    });
  };

  const savePermissionStatus = async (status: string) => {
    return withRetry(async () => {
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
    });
  };

  const clearPermissionStatus = async () => {
    return withRetry(async () => {
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
    });
  };

  const getPendingContacts = async () => {
    return withRetry(async () => {
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
    });
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
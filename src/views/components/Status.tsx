import React, { useState, useEffect } from 'react';
import {
  Box,
  Inline,
  Badge,
  Divider,
  Button,
  Icon,
  Link
} from "@stripe/ui-extension-sdk/ui";

interface UsageData {
  monthlyBreakdown: {
    yearMonth: string;
    monthName: string;
    sessionCount: number;
  }[];
  totalSessions: number;
}

interface PlanInfo {
  planName: string;
  planDisplayName: string;
  monthlySyncLimit: number;
  currentMonthUsage: number;
  remainingSyncs: number;
  status: string;
}

interface StatusProps {
  isMailchimpConnected: boolean;
  audience: string | null;
  permissions: string | null;
  onFetchUsage?: () => Promise<UsageData>;
  onError?: (error: string) => void;
  planInfo?: PlanInfo | null;
  getPricingPageUrl?: (accountId: string) => string;
  accountId?: string;
}

export const Status: React.FC<StatusProps> = ({
  isMailchimpConnected,
  audience,
  permissions,
  onFetchUsage,
  onError,
  planInfo,
  getPricingPageUrl,
  accountId
}) => {
  const isSyncingActive = isMailchimpConnected && audience && audience !== "" && permissions && permissions !== "";
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (onFetchUsage) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const data = await onFetchUsage();
          setUsageData(data);
        } catch (err) {
          if (onError) {
            onError((err as Error).message || "Failed to fetch usage data");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [onFetchUsage, onError]);

  if (loading) {
    return (
      <Box css={{ padding: "medium" }}>
        <Inline>Loading metrics...</Inline>
      </Box>
    );
  }

  const filteredAndSortedData = usageData?.monthlyBreakdown
    .filter(month => month.sessionCount > 0)
    .sort((a, b) => b.yearMonth.localeCompare(a.yearMonth)) || [];

  return (
    <Box css={{ stack: "y", rowGap: "medium", marginBottom: "small", padding: "small" }}>
      <Box css={{
        stack: "x",
        distribute: "space-between",
      }}>
        <Box css={{ stack: "y", rowGap: "small" }}>
          <Box css={{ stack: "x", columnGap: "small" }}>
            <Inline css={{  font: 'heading', fontWeight: 'semibold' }}>Status</Inline>
            {isSyncingActive ? (
              <Badge type="positive">Active</Badge>
              ) : (
             <Badge type="negative">Inactive</Badge>
            )}
          </Box>
          <Inline css={{ }}>
            { !isMailchimpConnected && 
              "Manage Mailchimp to begin syncing."
            }
            { isMailchimpConnected && (!audience || audience === "" || !permissions || permissions === "") && 
              "Manage Audience to begin syncing."
            }
            {
              isMailchimpConnected && audience && audience !== "" && permissions && permissions !== "" &&
              "Customers are being synced to Mailchimp."
            }
          </Inline>
        </Box>
      </Box>
      
      {permissions === 'pending' && (
        <Box css={{
          borderRadius: "medium",
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "neutral",
          padding: "small",
          stack: "y"
        }}>
          
          <Inline css={{ font: "caption", fontWeight: "semibold"}}>Not seeing new audience members?</Inline>
          
          <Box >
          <Inline css={{ font: "caption" }}>You're using the Double Opt-In setting.</Inline>
          {/* <Link
              external
              href="https://stripe.com/docs/stripe-apps"
              target="_blank"
              type="secondary"
            >
              <Inline css={{font:'caption', marginLeft: "small"}}>Learn More</Inline>
            </Link> */}
            </Box>
          
          
        </Box>
      )}
      
      {/* {planInfo && (
          <Box css={{ stack: "y", rowGap: "small" }}>
          <Inline css={{  font: 'heading', fontWeight: 'semibold' }}>
          {planInfo.planDisplayName} Plan
          </Inline>
          <Inline css={{ font: 'body' }}>
                Allowance {planInfo.monthlySyncLimit === -1 ? 'Unlimited' : planInfo.monthlySyncLimit} syncs
              </Inline>
              <Inline css={{ font: 'body' }}>
                Used: {planInfo.currentMonthUsage} syncs
              </Inline>
              <Inline css={{ font: 'body' }}>
                Remaining: {planInfo.remainingSyncs === -1 ? 'Unlimited' : planInfo.remainingSyncs} syncs
              </Inline>
        </Box>
        )} */}
    </Box>
  );
};
import React, { useState, useEffect } from 'react';
import {
  Box,
  Inline,
  Divider,
  Button,
  Icon
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

interface MetricsViewProps {
  onFetchUsage: () => Promise<UsageData>;
  onError: (error: string) => void;
  planInfo: PlanInfo | null;
  getPricingPageUrl: (accountId: string) => string;
  accountId: string;
}

export const MetricsView: React.FC<MetricsViewProps> = ({
  onFetchUsage,
  onError,
  planInfo,
  getPricingPageUrl,
  accountId
}) => {
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await onFetchUsage();
        setUsageData(data);
      } catch (err) {
        onError((err as Error).message || "Failed to fetch usage data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [onFetchUsage, onError]);

  if (loading) {
    return (
      <Box css={{ padding: "medium" }}>
        <Inline>Loading metrics...</Inline>
      </Box>
    );
  }

  if (!usageData) {
    return (
      <Box css={{ padding: "medium" }}>
        <Inline>No usage data available</Inline>
      </Box>
    );
  }

  const filteredAndSortedData = usageData.monthlyBreakdown
    .filter(month => month.sessionCount > 0)
    .sort((a, b) => b.yearMonth.localeCompare(a.yearMonth));

  return (
    <Box css={{ stack: "y", rowGap: "medium" }}>
      {planInfo && (
        <Box css={{
          padding: "medium",
          background: "container",
          borderRadius: "medium"
        }}>
          <Box css={{ stack: "y", rowGap: "small" }}>
            <Inline css={{  fontWeight: 'semibold' }}>
              Current Plan: {planInfo.planDisplayName}
            </Inline>
            <Inline css={{ fontWeight: 'semibold' }}>
              Sync Limit: {planInfo.monthlySyncLimit === -1 ? 'Unlimited' : planInfo.monthlySyncLimit} syncs
            </Inline>
            {planInfo.planName === "FREE" && (
              <Box css={{ stack: "y", rowGap: "small", marginTop: "small" }}>
                <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
                  Need more syncs? Upgrade to get 1000 syncs for $10/month
                </Inline>
                <Button 
                  href={getPricingPageUrl(accountId)}
                  type="primary"
                  size="medium"
                  css={{ width: "fill" }}
                >
                  Upgrade Plan
                  <Icon name="external"/>
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}

      <Box css={{
        padding: "medium",
        background: "container",
        borderRadius: "medium"
      }}>
        <Box css={{ stack: "y", rowGap: "small" }}>
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            Usage Summary
          </Inline>
          <Inline css={{ font: 'body' }}>
              Monthly Limit: {planInfo.monthlySyncLimit === -1 ? 'Unlimited' : planInfo.monthlySyncLimit} syncs
            </Inline>
            <Inline css={{ font: 'body' }}>
              This Month Used: {planInfo.currentMonthUsage} syncs
            </Inline>
            <Inline css={{ font: 'body' }}>
              Remaining: {planInfo.remainingSyncs === -1 ? 'Unlimited' : planInfo.remainingSyncs} syncs
            </Inline>
        </Box>
      </Box>

      <Box css={{
        padding: "medium",
        background: "container",
        borderRadius: "medium"
      }}>
        <Box css={{ stack: "y", rowGap: "small" }}>
          <Inline css={{ font: 'heading', fontWeight: 'semibold' }}>
            Monthly Breakdown
          </Inline>
          
          {filteredAndSortedData.length === 0 ? (
            <Inline css={{ font: 'body', color: 'secondary' }}>
              No usage data to display
            </Inline>
          ) : (
            filteredAndSortedData.map((month, index) => (
              <Box key={month.yearMonth}>
                <Box css={{ 
                  stack: "x", 
                  distribute: "space-between", 
                  alignY: "center",
                  paddingY: "small"
                }}>
                  <Inline css={{ font: 'body' }}>
                    {month.monthName}
                  </Inline>
                  <Inline css={{ font: 'body' }}>
                    {month.sessionCount} syncs
                  </Inline>
                </Box>
                {index < filteredAndSortedData.length - 1 && (
                  <Divider />
                )}
              </Box>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};
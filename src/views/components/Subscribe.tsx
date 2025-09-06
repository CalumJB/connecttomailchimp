import React from 'react';
import {
  Box,
  Button,
  Inline,
  Icon
} from "@stripe/ui-extension-sdk/ui";

interface SubscribeProps {
  getPricingPageUrl: (accountId: string) => string;
  accountId: string;
}

export const Subscribe: React.FC<SubscribeProps> = ({
  getPricingPageUrl,
  accountId
}) => {
  return (
    <Box css={{ 
      stack: "y", 
      rowGap: "small", 
    }} >
  
        <Box css={{ 
          stack: "y",
          rowGap: "medium",
          distribute: "space-between",
          alignY: "center",
          padding: "medium",
          background: "container",
          borderRadius: "medium"
        }}>
          <Inline css={{fontWeight: "semibold"}}>Start Syncing Customers</Inline>
          <Inline>
            Try it free for 14 days. Then keep syncing for as little as $4/month.
          </Inline>
          <Button 
            href={getPricingPageUrl(accountId)}
            type="primary"
            size="medium"
            css={{width:"fill"}}
          >
            Start Free Trial
            <Icon name="external"/>
          </Button>
        </Box>
     
    </Box>
    
  );
};
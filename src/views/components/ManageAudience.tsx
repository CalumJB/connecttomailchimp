import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Inline,
  Select,
  Badge,
  Icon,
  Link,
  Spinner
} from "@stripe/ui-extension-sdk/ui";

interface MailchimpAudience {
  id: string;
  name: string;
  member_count: number;
}

interface ManageAudienceProps {
  onFetchAudiences: () => Promise<MailchimpAudience[]>;
  onFetchSelectedAudience: () => Promise<string>;
  onSaveAudience: (audienceId: string) => Promise<void>;
  onError: (error: string) => void;
  onShowSuccess: (message: string) => void;
}

export const ManageAudience: React.FC<ManageAudienceProps> = ({
  onFetchAudiences,
  onFetchSelectedAudience,
  onSaveAudience,
  onError,
  onShowSuccess
}) => {
  const [audiences, setAudiences] = useState<MailchimpAudience[]>([]);
  const [selectedAudienceId, setSelectedAudienceId] = useState<string>("");
  const [originalAudienceId, setOriginalAudienceId] = useState<string>("");
  const [audiencesLoading, setAudiencesLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const loadAudienceData = async () => {
      setAudiencesLoading(true);
      try {
        const [audiencesData, selectedId] = await Promise.all([
          onFetchAudiences(),
          onFetchSelectedAudience()
        ]);
        
        setAudiences(audiencesData);
        setSelectedAudienceId(selectedId);
        setOriginalAudienceId(selectedId);
      } catch (err) {
        onError((err as Error).message || "Failed to load audience data");
      } finally {
        setAudiencesLoading(false);
      }
    };

    loadAudienceData();
  }, []); // Empty dependency array - only run on mount

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      await onSaveAudience(selectedAudienceId);
      setOriginalAudienceId(selectedAudienceId);
      onShowSuccess("Audience Updated.");
    } catch (err) {
      onError((err as Error).message || "Failed to save audience selection");
    } finally {
      setSaveLoading(false);
    }
  };


  const hasChanges = selectedAudienceId !== originalAudienceId && selectedAudienceId != "";

  const handleRefresh = async () => {
    setAudiencesLoading(true);
    try {
      const [audiencesData, selectedId] = await Promise.all([
        onFetchAudiences(),
        onFetchSelectedAudience()
      ]);
      
      setAudiences(audiencesData);
      setSelectedAudienceId(selectedId);
      setOriginalAudienceId(selectedId);
    } catch (err) {
      onError((err as Error).message || "Failed to load audience data");
    } finally {
      setAudiencesLoading(false);
    }
  };

  return (
    <Box css={{
      stack: "y",
      rowGap: "medium",
      distribute: "space-between",
      alignY: "center",
      padding: "medium",
      background: "container",
      borderRadius: "medium"
    }}>
      <Box css={{ stack: "x", rowGap: "medium", distribute: "space-between", alignY: "center" }}>
        <Inline css={{ color: 'primary', fontWeight: 'semibold'}}>
          Audience
        </Inline>
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
                onPress={handleRefresh}
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
                disabled={!hasChanges || saveLoading}
                type="primary"
              >
                { saveLoading && (<Spinner size='small'/>) }
                Save
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};
"use client";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";

interface WrapperProps {
  children: React.ReactNode;
}

export const ContentfulPreviewProvider: React.FC<WrapperProps> = ({
  children,
}) => {
  return (
    <ContentfulLivePreviewProvider
      locale="en-GB"
      targetOrigin="https://app.contentful.com"
    >
      {children}
    </ContentfulLivePreviewProvider>
  );
};

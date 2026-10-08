import React, { forwardRef } from 'react';
import { Template01 } from './Template01';
import { Template02 } from './Template02';
import { Template03 } from './Template03';
import { Template04 } from './Template04';
import { Template05 } from './Template05';
import { Template06 } from './Template06';

export const ResumePreview = forwardRef(({ resume }, ref) => {
  const theme = resume?.template?.theme || '01';
  const colorPalette = resume?.template?.colorPalette || ['#4f46e5'];
  const primaryColor = colorPalette[0] || '#4f46e5';

  const renderTemplate = () => {
    switch (theme) {
      case '02':
        return <Template02 resume={resume} themeColor={primaryColor} />;
      case '03':
        return <Template03 resume={resume} themeColor={primaryColor} />;
      case '04':
        return <Template04 resume={resume} themeColor={primaryColor} />;
      case '05':
        return <Template05 resume={resume} themeColor={primaryColor} />;
      case '06':
        return <Template06 resume={resume} themeColor={primaryColor} />;
      case '01':
      default:
        return <Template01 resume={resume} themeColor={primaryColor} />;
    }
  };

  return (
    <div
      ref={ref}
      id="resume-pdf-root"
      className="bg-white shadow-xl mx-auto overflow-hidden print:shadow-none print:m-0 w-full"
      style={{
        maxWidth: '850px',
        minHeight: '1100px',
      }}
    >
      {renderTemplate()}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

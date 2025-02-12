import * as React from 'react';



const EmailTemplate = ({ firstName }: { firstName: string }) => (
  <div>
    <h1>Hello {firstName},</h1>
    <p>This is your email template content.</p>
  </div>
);

export default EmailTemplate;


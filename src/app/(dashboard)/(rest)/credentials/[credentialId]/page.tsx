interface IPageProps {
  params: Promise<{
    credentialId: string;
  }>;
}

export default async function CredentialsPage({ params }: IPageProps) {
  const { credentialId } = await params;
  return <div>Credentials {credentialId}</div>;
}

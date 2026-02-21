interface IPageProps {
    params: Promise<{
        executionId: string
    }>
}

export default async function CredentialsPage({ params }: IPageProps) {
    const { executionId } = await params
    return (
        <div>Credentials {executionId}</div>
    )
}

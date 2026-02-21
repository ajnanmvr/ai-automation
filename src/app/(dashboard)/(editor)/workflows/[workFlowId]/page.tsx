interface IPageProps {
    params: Promise<{
        workFlowId: string
    }>
}

export default async function CredentialsPage({ params }: IPageProps) {
    const { workFlowId } = await params
    return (
        <div>Credentials {workFlowId}</div>
    )
}

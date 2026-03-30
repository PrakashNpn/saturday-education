import DestinationDetail from "@/features/destination/components/DestinationDetail"

export default async function DestinationDetailPage({ params }: { params: Promise<{ country: string }> }) {
  const { country } = await params
  return (
    <main>
      <DestinationDetail country={country} />
    </main>
  )
}

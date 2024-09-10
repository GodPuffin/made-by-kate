import { Loader } from "@mantine/core"

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Loader size={36} />
    </div>
  )
}

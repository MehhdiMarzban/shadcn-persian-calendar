import { PersianCalendar } from "@/components/ui/persian-calendar";
import Image from "next/image";

export default function Home() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <div className="flex flex-row gap-2 items-center">
                    <Image
                        className="dark:invert"
                        src="/shadcn.png"
                        alt="shadcn logo"
                        width={50}
                        height={50}
                        priority
                    />
                    <h1 className="text-xl font-bold tracking-normal sm:text-2xl font-[family-name:var(--font-vazirmatn-sans)]">
                        تقویم جلالی برای shadcn/ui
                    </h1>
                </div>
                <div className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-vazirmatn-sans)]">
                    <li className="mb-2 text-right tracking-[-.01em]">
                        برای نصب تمامی تنظیمات مورد نیاز برای این کامپوننت، از دستور زیر استفاده
                        کنید.
                    </li>
                    <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold text-left">
                        npx shadcn add
                        https://shadcn-persian-calendar.mehdi-marzban.ir/persian-calendar.json
                    </code>
                    <PersianCalendar className="rounded-md border mx-auto mt-4 shadow" />
                </div>
            </main>
        </div>
    );
}

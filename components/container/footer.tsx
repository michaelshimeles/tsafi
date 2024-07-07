import Link from 'next/link'

const navigation = {
    connect: [
        {
            name: 'Github',
            href: 'https://github.com/michaelshimeles/cms',
        },
    ],
    company: [
        { name: 'X', href: 'https://x.com/rasmickyy' },
        { name: 'YouTube', href: 'https://www.youtube.com/@rasmic' },
        { name: 'Discord', href: 'https://discord.gg/TRccaehh8n' },
    ],
}

const Footer = () => {
    return (
        <main className="flex min-w-screen flex-col items-center justify-between border-t pt-[4rem] px-7 pb-7">
            <footer
                aria-labelledby="footer-heading"
                className="font-inter w-full max-w-7xl"
            >
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="mx-auto max-w-7xl px-2">
                    <div className="flex flex-col justify-between lg:flex-row">
                        <div className="space-y-8">
                            <p className='font-semibold'>tsafi</p>
                            <p className="text-md max-w-xs leading-6 text-gray-700 dark:text-gray-400">
                                I built this because I didn&apos;t want to read the docs of another CMS.
                            </p>
                            <Link href="https://x.com/rasmickyy" target='_blank' className="flex space-x-6 text-sm dark:text-gray-400 text-gray-700">
                                <div>Made with ❤️ by Micky.</div>
                            </Link>
                        </div>
                        {/* Navigations */}
                        <div className="mt-16 grid grid-cols-2 gap-14 md:grid-cols-2 lg:mt-0 xl:col-span-2">
                            <div className="md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900">
                                    Code
                                </h3>
                                <div className="mt-6 space-y-4">
                                    {navigation.connect.map((item) => (
                                        <div key={item.name}>
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-sm leading-6 dark:text-gray-400 text-gray-700 hover:text-gray-900"
                                            >
                                                {item.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h3 className="text-sm font-semibold leading-6 dark:text-gray-200 text-gray-900">
                                        Social
                                    </h3>
                                    <div className="mt-6 space-y-4">
                                        {navigation.company.map((item) => (
                                            <div key={item.name}>
                                                <Link
                                                    href={item.href}
                                                    className="text-sm leading-6 dark:text-gray-400 text-gray-700 hover:text-gray-900"
                                                >
                                                    {item.name}
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
                        <p className="text-xs leading-5 dark:text-gray-400 text-gray-700">
                            &copy; 2024 Tsafi. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    )
}

export default Footer
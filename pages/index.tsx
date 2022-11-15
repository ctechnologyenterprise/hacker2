import Head from "next/head";
import GithubCorner from "@/components/github-corner";
import SlackButton from "@/components/slack-button";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>Hacker News Slack Bot</title>
      </Head>
      <GithubCorner url="https://github.com/vercel-labs/hacker-news-slack-bot" />

      <main className="flex flex-col space-y-5 items-center justify-center min-h-screen max-h-screen py-10 sm:pb-20">
        <div className="relative w-[422px] h-[66px] sm:w-[633px] sm:h-[100px]">
          <Image
            src="/banner.png"
            alt="Hacker News Slack Bot Banner"
            layout="fill"
          />
        </div>
        <div className="text-center max-w-md sm:max-w-lg space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Hacker News Slack Bot
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            A bot that notifies you on Slack whenever your company/product is
            mentioned on Hacker News.
          </p>
        </div>

        <div
          className="relative w-full max-w-2xl border border-gray-200 drop-shadow-md 
         sm:rounded-lg overflow-hidden"
        >
          <LiteYouTubeEmbed
            id="gBCIaf200oQ"
            adNetwork={true}
            playlist={false}
            title="Hacker News Slack Bot Demo"
            noCookie={true}
            thumbnail="/screenshot.png"
            aspectHeight={10}
          />
        </div>
        {session ? (
          <div className="flex flex-col text-center space-y-2">
            <SlackButton
              text="Add to Slack"
              url={`https://slack.com/oauth/v2/authorize?scope=chat:write,chat:write.public,links:read,links:write,commands,team:read&client_id=${process.env.NEXT_PUBLIC_SLACK_CLIENT_ID}`}
            />
            <a
              href="https://github.com/vercel-labs/hacker-news-slack-bot#deploy-your-own"
              className="text-gray-500 hover:text-black text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Looking to self-host instead?
            </a>
          </div>
        ) : (
          <button
            type="button"
            className="text-black bg-white ring-2 hover:text-white hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
            onClick={() =>
              signIn("google", { callbackUrl: "http://localhost:3000" })
            }
          >
            <svg
              className="mr-2 -ml-1 w-4 h-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign in with Google
          </button>
        )}
        <div className="flex space-x-4 absolute bottom-2 right-4">
          <Link href="/support">
            <a className="text-gray-500 text-sm hover:text-black">Support</a>
          </Link>
          <a
            className="text-gray-500 text-sm hover:text-black"
            href="/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </div>
      </main>
    </div>
  );
}

import React from "react"
import GitHubCalendar from "react-github-calendar"
import styles from "./GitHubActivity.module.css" // <-- 1. Import the CSS module

const GitHubActivity = () => {
  const username = "SerAbin1"

    const CustomLegend = () => (

      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">

        <span>Less</span>

        <div className="flex items-center gap-1">

          <div className="w-3 h-3 rounded-sm bg-[#161b22] border border"></div>

          <div className="w-3 h-3 rounded-sm bg-[#0e4429]"></div>

          <div className="w-3 h-3 rounded-sm bg-[#006d32]"></div>

          <div className="w-3 h-3 rounded-sm bg-[#26a641]"></div>

          <div className="w-3 h-3 rounded-sm bg-[#39d353]"></div>

        </div>

        <span>More</span>

      </div>

    )

  

    return (

      <section id="github" className="py-15">

        <div className="space-y-8 w-full py-8 md:py-12">

          {/* Title and Paragraph */}

          <div className="flex flex-col items-center justify-center space-y-4 text-center px-4">

            <div className="space-y-2">

              <h2 className="text-2xl font-bold tracking-tighter text-foreground sm:text-3xl md:text-5xl">

                My GitHub Activity

              </h2>

              <p className="text-muted-foreground text-base md:text-xl/relaxed">

                Here's my contribution graph showing my coding activity over the

                past year.

              </p>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden px-4">
          <div className="bg-card border border rounded-lg p-4 space-y-4">
            <CustomLegend />
            {/* 2. Apply the local class along with Tailwind classes */}
            <div className={`overflow-x-auto ${styles.scrollbarContainer}`}>
              <div className="min-w-[550px] flex justify-center pr-4">
                <GitHubCalendar
                  username={username}
                  blockSize={11}
                  blockMargin={3}
                  fontSize={12}
                  hideMonthLabels
                  hideTotalCount
                  hideColorLegend
                />
              </div>
            </div>
          </div>
        </div>

        {/* Desktop View (no scrollbar needed, so no changes here) */}
        <div className="hidden md:flex justify-center">
          <div className="bg-card border border rounded-lg p-6 max-w-4xl">
            <GitHubCalendar
              username={username}
              blockSize={14}
              blockMargin={5}
              fontSize={14}
              hideMonthLabels
              hideTotalCount
              hideColorLegend
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default GitHubActivity


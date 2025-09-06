import React from "react";

const AboutSidebar = ({ c }) => {
  return (
    <aside className="col-span-4">
      <div className={`sticky top-8 ${c.bg} p-3 sm:p-6 border ${c.border}`}>
        {/* Quick Facts */}
        <div className="mb-4 sm:mb-8">
          <h3
            className={`${c.accent} font-medium mb-2 sm:mb-4 text-xs uppercase tracking-wider`}
          >
            quick facts
          </h3>
          <div className="space-y-2 sm:space-y-3">
            <div>
              <div className={`${c.fade} text-xs uppercase tracking-wide`}>
                location
              </div>
              <div className={`${c.main} text-xs`}> Japan</div>
            </div>
            <div>
              <div className={`${c.fade} text-xs uppercase tracking-wide`}>
                focus
              </div>
              <div className={`${c.main} text-xs`}>
                Full-stack Development
              </div>
            </div>
            <div>
              <div className={`${c.fade} text-xs uppercase tracking-wide`}>
                passion
              </div>
              <div className={`${c.main} text-xs`}>Debugging Life</div>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div
          className={`p-3 sm:p-4 border ${c.border} bg-opacity-50 overflow-hidden`}
        >
          <div className={`${c.accent} text-xs font-medium mb-1 sm:mb-2`}>
            currently working on
          </div>
          <div
            className={`${c.fade} text-[10px] sm:text-xs leading-relaxed break-words`}
          >
            Making small apps, practicing coding, and discovering new ways to
            solve problems.
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AboutSidebar;
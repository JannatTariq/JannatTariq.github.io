// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Resume tabs
const resumes = {
  mobile: {
    title: "Mobile Developer",
    desc: "Flutter & React Native focus. Health/fitness API integrations, cross-platform app delivery, App Store & Play Store releases.",
    file: "resumes/Jannat_Tariq_MobileDev.pdf",
  },
  pm: {
    title: "Project Manager",
    desc: "Requirements gathering, feature planning, SDLC coordination, client communication, UAT and delivery across multiple projects.",
    file: "resumes/Jannat_Tariq_PM.pdf",
  },
  ie: {
    title: "Implementation Engineer",
    desc: "Client-facing implementation, workflow configuration, API integrations, production support and technical troubleshooting.",
    file: "resumes/Jannat_Tariq_IE.pdf",
  },
  general: {
    title: "General Software Developer",
    desc: "Broad software development profile covering web, mobile, backend, integrations and client delivery.",
    file: "resumes/Jannat_Tariq_General.pdf",
  },
};

const tabs = document.querySelectorAll(".tab");
const titleEl = document.getElementById("resume-title");
const descEl = document.getElementById("resume-desc");
const linkEl = document.getElementById("resume-link");
const frameEl = document.getElementById("resume-frame");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    const r = resumes[tab.dataset.role];
    titleEl.textContent = r.title;
    descEl.textContent = r.desc;
    linkEl.href = r.file;
    frameEl.src = r.file;
  });
});

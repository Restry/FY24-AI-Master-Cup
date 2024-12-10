const navigationData = {
  groups: [
    {
      label: '拜访准备',
      links: [
        { url: 'index.html', text: '主页' },
        { url: 'data_analysis.html', text: '数据分析' },
        { url: 'proposal.html', text: '提案生成' }
      ]
    },
    {
      label: '客户拜访',
      links: [
        { url: 'voice_feedback.html', text: '语音反馈' },
        { url: 'industry_trends.html', text: '行业动态' }
      ]
    },
    {
      label: '后续跟进',
      links: [
        { url: 'feedback_task.html', text: '反馈记录' },
        // { url: 'team_collaboration.html', text: '团队协作' },
        { url: 'summary.html', text: '工作总结' }
      ]
    }
  ]
};

function generateNavigation() {
  const nav = document.createElement('nav');

  navigationData.groups.forEach(group => {
    const navGroup = document.createElement('div');
    navGroup.className = 'nav-group';

    const groupLabel = document.createElement('span');
    groupLabel.className = 'group-label';
    groupLabel.textContent = group.label;

    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';

    group.links.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.text;

      // 设置当前页面的active状态
      const currentPage = window.location.pathname.split('/').pop();
      if (currentPage === link.url) {
        a.className = 'active';
      }

      navLinks.appendChild(a);
    });

    navGroup.appendChild(groupLabel);
    navGroup.appendChild(navLinks);
    nav.appendChild(navGroup);
  });

  return nav;
}

// 当DOM加载完成后初始化导航
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const nav = generateNavigation();
  header.appendChild(nav);
});

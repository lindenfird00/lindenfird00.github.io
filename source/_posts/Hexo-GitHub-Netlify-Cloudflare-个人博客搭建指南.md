---
title: 面向Windows11用户利用Vmware虚拟机Ubantu系统搭建个人博客的详细指南（Hexo + GitHub + Netlify + Cloudflare）
date: 2026-02-25 18:42:16
tags:
- Windows 11
- Vmware17.6
- ubuntu-24.04.4
- Blog building
- Hexo
- Github
---


## 前言

这是我的第一篇博客，我记录了自己搭建博客的整个过程方便我日后回顾，也想为像我一样的初学者提供一些便利，在我们开始之前，你或许有一些疑问：

### **为什么我搭建博客需要先搭建虚拟机？**

一般来说，搭建博客有以下几种方式：

<div style="margin-left: 2em;">

- 使用<a href="#fn1" class="footnote-ref">虚拟机</a>+<a href="#fn2" class="footnote-ref">Ubuntu</a>或者<a href="#fn3" class="footnote-ref">LinuxWindows双系统</a>
- Windows直接搭建
- 云服务直接部署
- 使用博客平台

</div>

相比于

<div style="margin-left: 2em;">

- 有许多潜在版本兼容问题的Windows搭建
- 高成本的云服务部署
- 收获很低的现成博客平台

</div>

使用虚拟机+Ubuntu在0成本的基础上难度适中且操作自由，适合想学习<a href="#fn4" class="footnote-ref">Linux</a>并希望完全掌握博客写作的初学者，通过系统性的学习创造出一个专用的简洁的写作空间并长期稳定地使用。
 
### **为什么采用Hexo+Github+Netlify+cloudflare的搭建思路？**

这套方案用最低的成本（仅域名费用），实现了最高效的自动化工作流，同时可以让你在学习过程中掌握现代 Web 开发的多个核心技能。
这里的搭建思路来源于爱扑Bug的熊，他的教学视频形象易懂并言简意赅，非常适合初学者，这里提供他的博客链接。

#### **搭建思路拆解**

在虚拟机的ubuntu系统中

<div style="margin-left: 2em;">

- Hexo作为静态网站生成器将你编写的<a href="#fn5" class="footnote-ref">markdown</a>文章转换为<a href="#fn6" class="footnote-ref">HTML</a>+<a href="#fn7" class="footnote-ref">CSS</a>+<a href="#fn8" class="footnote-ref">JS</a>网页。
- GitHub作为代码仓库存放你的博客源码，并通过Git实现版本控制，留存修改历史。
- Netlify作为自动<a href="#fn9" class="footnote-ref">部署</a>平台，监听GitHub仓库变化，自动拉取最新代码、执行构建命令（hexo generate），并将生成的静态网站托管到全球CDN网络。
- Cloudflare 提供<a href="#fn10" class="footnote-ref">DNS</a>解析 + <a href="#fn11" class="footnote-ref">CDN</a>加速双重服务：通过DNS将你的域名指向Netlify源服务器，同时智能判断用户地理位置，返回最近的CDN节点IP，实现全球加速访问。

</div>

#### **搭建过程优势**

整个过程唯一的付费项便是域名的购买，只需要花费不到100元，你就可以享受到

<div style="margin-left: 2em;">

- 安全：自动 SSL 证书，HTTPS 加密
- 灵活：随时更换主题、修改配置
- 自动化：一劳永逸，自动部署
- CDN加速：页面加载速度快

</div>

通过完成这个搭建过程，你可以在实际操作中

<div style="margin-left: 2em;">

- 掌握 Git 版本控制 的基本操作
- 理解 静态站点生成 的原理
- 熟悉 Linux 基础命令 和终端操作
- 了解 DNS 解析 和 CDN 加速的工作机制

</div>

## 前言注释

<p id="fn1"><strong>1.虚拟机(virtual machine)</strong></p>
<p>虚拟机相当于一个沙盒软件，在电脑中安装一个虚拟机后，你可以在现有的操作系统中安装你想要的系统并随意实验，系统与电脑本机隔离，不会互相影响但可互相兼容。这里我使用Vmware Workstation Pro 17.6。 <a href="#" class="footnote-backref">↩</a></p>
<p id="fn2"><strong>2.Ubuntu</strong></p>
<p>Ubuntu是Linux这类操作系统中的一个最适合新手的版本。Linux是一个负责管理硬件的内核，但是它没有界面，你无法直接操作它，而Ubuntu作为一个完整的发行版包括Linux内核、软件包管理系统、预装的应用软件、社区和商业支持。这里我使用在清华大学镜像网站下载 ubuntu-24.04.4。<a href="#" class="footnote-backref">↩</a></p>
<p id="fn3"><strong>3.LinuxWindows双系统(Dual-booting)</strong></p>
<p>双系统是在同一个电脑上同时安装两个操作系统，你无法同时运行Windows和Linux，需要重启切换，并进行硬盘分区。对于不需要本机显卡或其他硬件进行高性能计算、游戏或硬件开发的用户，只进行日常学习或开发，虚拟机已完全够用。<a href="#" class="footnote-backref">↩</a></p>
<p id="fn4"><strong>4.Linux</strong></p>
<p>Linux免费、开源、资源占用小且非常灵活，在服务器市场占比超过70%。这意味着Linux不同于官方设定完成的需要花钱购买许可证的Windows，linux可以由用户自行改造，学习并改造它的过程就是你熟悉Linux操作和服务器管理的过程。也就是说，学习过Linux，你就从一个用户成长了为一名开发者，一个创造者。
最重要的是，在Linux中你遇到的问题，几乎都有人遇到过并解决了，这能给初学者很强的安全感。<a href="#" class="footnote-backref">↩</a></p> 

<p id="fn5"><strong>5.markdown</strong></p>
<p>Markdown 是一种轻量级标记语言，让你能用纯文本格式写出带格式的文档。在markdown中，用户可以直接输入简单的符号（#、**、-），达到和word文档中一样的加粗、斜体和列表效果。<a href="#" class="footnote-backref">↩</a></p>

<p id="fn6"><strong>6.HTML(Hypertext Markup Language)</strong></p>
<p>HTML全称为超文本标记语言。它相当于网页的结构层，也可理解为一篇文章的大纲。它负责搭起网页的主要结构。<a href="#" class="footnote-backref">↩</a></p>

<p id="fn7"><strong>7.CSS(Cascading Style Sheets)</strong></p>
<p>CSS全称为层叠样式表。它相当于网页的样式层，也可以理解为一篇文章的格式。它负责给网页美化，装饰结构层。<a href="#" class="footnote-backref">↩</a></p>

<p id="fn8"><strong>8.JS(JavaScript)</strong></p>
<p>JavaScript 是让网页"活起来"的编程语言。它相当于网页的交互层，为网页提供动画效果。它负责提升用户的体验感，让网页时时响应用户的问询。<a href="#" class="footnote-backref">↩</a></p>

<p id="fn9"><strong>9.部署</strong></p>
<p>用户写好的博客文章（Markdown），经过 Hexo 处理，变成了 HTML/CSS/JS 文件。这些文件现在只存在于你的虚拟机里。要让全世界的人都能访问，你需要把这些文件放到一台 24 小时运行的服务器上，有人访问时，服务器把文件发给他们。这就是部署的本质。<a href="#" class="footnote-backref">↩</a></p>

<p id="fn10"><strong>10.DNS(Domain Name System)</strong></p>
<p>DNS全称为域名系统。它将域名转码为IP地址并指向对应服务器，节省传输时间，此方案中为cloud flare指向netlify服务器。<a href="#" class="footnote-backref">↩</a></p>

<p id="fn11"><strong>11.CDN(Content Delivery Network)</strong></p>
<p>CDN全称为内容分发网络。它将你的网站文件提前复制到世界各地的服务器上，让访客从最近的服务器获取，降低延迟。<a href="#" class="footnote-backref">↩</a></p>








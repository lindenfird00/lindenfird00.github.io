---
title: 面向Windows11用户利用Vmware虚拟机Ubantu系统搭建个人博客的详细指南
layout: note-post
date: 2026-02-27
---
# 📕Hexo+Github+Netlify+Cloudflare结构的实践

## 📖前言

这是我的第一篇博客，我记录了自己搭建博客的整个过程方便我日后回顾，也想为像我一样的初学者提供一些便利，在我们开始之前，你或许想知道：

<div class="faq-item">
    <div class="faq-question">为什么我搭建博客需要先搭建虚拟机？</div>
    <div class="faq-answer">
	<p>一般来说，搭建博客有以下几种方式：</p>
        <div style="margin-left: 2em;">
            <ul>
                <li>使用<a href="#fn1" class="footnote-ref"><strong>虚拟机</strong></a>+<a href="#fn2" class="footnote-ref"><strong>Ubuntu</strong></a>或者<a href="#fn3" class="footnote-ref"><strong>Linux/Windows双系统</strong></a></li>
                <li>Windows直接搭建</li>
                <li>云服务直接部署</li>
                <li>使用博客平台</li>
            </ul>
        </div>
        <p>相比较于</p>
	<div style="margin-left: 2em;">
	    <ul>
		<li>有许多潜在版本兼容问题的Windows搭建</li>
		<li>高成本的云服务部署</li>
		<li>收获很低的现成博客平台</li>
	    </ul>
	</div>
	<p>使用虚拟机+Ubuntu在0成本的基础上难度适中且操作自由，适合想学习<a href="#fn4" class="footnote-ref"><strong>Linux</strong></a>并希望完全掌握博客写作的初学者，通过系统性的学习创造出一个专用的简洁的写作空间并长期稳定地使用。</p>
	<div class="footnotes">
		<p id="fn1"><strong>1.虚拟机(virtual machine)</strong>相当于一个沙盒软件，在电脑中安装一个虚拟机后，你可以在现有的操作系统中安装你想要的系统并随意实验，系统与电脑本机隔离，不会互相影响但可互相兼容。这里我使用Vmware Workstation Pro 17.6。</p>
		<p id="fn2"><strong>2.Ubuntu</strong>是Linux这类操作系统中的一个最适合新手的版本。Linux是一个负责管理硬件的内核，但是它没有界面，你无法直接操作它，而Ubuntu作为一个完整的发行版包括Linux内核、软件包管理系统、预装的应用软件、社区和商业支持。这里我使用在清华大学镜像网站下载 ubuntu-24.04.4。</p>
		<p id="fn3"><strong>3.LinuxWindows双系统(Dual-booting)</strong>是在同一个电脑上同时安装两个操作系统，你无法同时运行Windows和Linux，需要重启切换，并进行硬盘分区。对于不需要本机显卡或其他硬件进行高性能计算、游戏或硬件开发的用户，只进行日常学习或开发，虚拟机已完全够用。</p>
		<p id="fn4"><strong>4.Linux</strong>免费、开源、资源占用小且非常灵活，在服务器市场占比超过70%。这意味着Linux不同于官方设定完成的需要花钱购买许可证的Windows，linux可以由用户自行改造，学习并改造它的过程就是你熟悉Linux操作和服务器管理的过程。也就是说，学习过Linux，你就从一个用户成长了为一名开发者，一个创造者。最重要的是，在Linux中你遇到的问题，几乎都有人遇到过并解决了，这能给初学者很强的安全感。</p>
	</div>
    </div>
</div>
<div class="faq-item">
    <div class="faq-question">为什么采用Hexo+Github+Netlify+cloudflare的搭建思路？</div>
    <div  class="faq-answer">
	<p>这套方案用最低的成本（仅域名费用），实现了最高效的自动化工作流，同时可以让你在学习过程中掌握现代 Web 开发的多个核心技能。</p>
	<p>这里的搭建思路来源于爱扑Bug的熊，他的教学视频形象易懂并言简意赅，非常适合初学者，这里提供他的博客链接。</p>
        <p>搭建思路</p>
	<p>在虚拟机的ubuntu系统中</p>
	<div style="margin-left: 2em;">
	    <ul>
		<li>Hexo作为静态网站生成器将你编写的<a href="#fn5" class="footnote-ref"><strong>markdown</strong></a>文章转换为<a href="#fn6" class="footnote-ref"><strong>HTML</strong></a>+<a href="#fn7" class="footnote-ref"><strong>CSS</strong></a>+<a href="#fn8" class="footnote-ref"><strong>JS</strong></a>网页。</li>
		<li>GitHub作为代码仓库存放你的博客源码，并通过Git实现版本控制，留存修改历史。</li>
		<li>Netlify作为自动<a href="#fn9" class="footnote-ref"><strong>部署</strong></a>平台，监听GitHub仓库变化，自动拉取最新代码、执行构建命令（hexo generate），并将生成的静态网站托管到全球CDN网络。</li>
		<li>Cloudflare 提供<a href="#fn10" class="footnote-ref"><strong>DNS</strong></a>解析 + <a href="#fn11" class="footnote-ref"><strong>CDN</strong></a>加速双重服务：通过DNS将你的域名指向Netlify源服务器，同时智能判断用户地理位置，返回最近的CDN节点IP，实现全球加速访问。</li>
	    </ul>
	</div>
	<p>搭建过程优势</p>
	<p>整个过程唯一的付费项便是域名的购买，只需要花费不到100元，你就可以享受到：</p>
	<div style="margin-left: 2em;">
	    <ul>
		<li>安全：自动SSL证书，HTTPS加密</li>
		<li>灵活：随时更换主题，修改配置</li>
		<li>自动化：一劳永逸，自动部署</li>
		<li>CDN加速：页面加载速度更快</li>
	    </ul>
	</div>
	<p>通过完成这个搭建过程，你可以在实际操作中逐渐熟悉并理解</p>
	 <div style="margin-left: 2em;">
	    <ul>
		<li>Git版本控制的基本操作</li>
                <li>静态站点生成原理</li>
                <li>Linux基础命令和终端操作</li>
                <li>DNS解析和CDN加速的工作机制</li>
	    </ul>
	</div>
        <div class="footnotes">
		<p id="fn5"><strong>5.markdown</strong>是一种轻量级标记语言，让你能用纯文本格式写出带格式的文档。在markdown中，用户可以直接输入简单的符号（#、**、-），达到和word文档中一样的加粗、斜体和列表效果。</p>
		<p id="fn6"><strong>6.HTML(Hypertext Markup Language)</strong>全称为超文本标记语言。它相当于网页的结构层，也可理解为一篇文章的大纲。它负责搭起网页的主要结构。</p>
		<p id="fn7"><strong>7.CSS(Cascading Style Sheets)</strong>全称为层叠样式表。它相当于网页的样式层，也可以理解为一篇文章的格式。它负责给网页美化，装饰结构层。</p>
		<p id="fn8"><strong>8.JS(JavaScript)</strong>是让网页"活起来"的编程语言。它相当于网页的交互层，为网页提供动画效果。它负责提升用户的体验感，让网页时时响应用户的问询。</p>
		<p id="fn9"><strong>9.部署</strong>用户写好的博客文章（Markdown），经过 Hexo 处理，变成了 HTML/CSS/JS 文件。这些文件现在只存在于你的虚拟机里。要让全世界的人都能访问，你需要把这些文件放到一台 24 小时运行的服务器上，有人访问时，服务器把文件发给他们。这就是部署的本质。</p>
		<p id="fn10"><strong>10.DNS(Domain Name System)</strong>全称为域名系统。它将域名转码为IP地址并指向对应服务器，节省传输时间，此方案中为cloud flare指向netlify服务器。</p>
		<p id="fn11"><strong>11.CDN(Content Delivery Network)</strong>全称为内容分发网络。它将你的网站文件提前复制到世界各地的服务器上，让访客从最近的服务器获取，降低延迟。</p>
	</div>
    </div>
</div>

## 🛠️ 搭建过程

整个搭建过程分为三个阶段，通过安装VMware虚拟机和Ubuntu操作系统准备博客写作的环境，安装Hexo安装博客的初始化框架，最后配置Github,Netlify和Cloudflare将博客部署上线。

<p class="normal-text">一、环境准备</p>
<p>1. 安装VMware station和Ubuntu操作系统</p>
<div style="margin-left: 2em;">
	<p>安装VMware教程</p>
	<p>https://blog.csdn.net/qq_62888264/article/details/145102532</p>
	<p>Ubuntu镜像资源</p>
	<p>https://mirrors.tuna.tsinghua.edu.cn/ubuntu-releases/</p>
</div>
<div class="faq-item">
    <div class="faq-question">如果你想卸载VMware</div>
    <div class="faq-answer">
	<ol class="numbered-list">		
	<li>
	    <h4>（1）卸载前的准备</h4>
	    <p>为了防止文件占用导致卸载失败，需要先关闭所有VMware相关程序。</p>
	    <p><strong>退出虚拟机:</strong>正常关闭所有正在运行的虚拟机系统</p>
	    <p><strong>结束顽固进程:</strong>
		<p>右键点击右键点击“开始”菜单或按 Win + X，选择 “Windows PowerShell (管理员)” 或 “命令提示符 (管理员)”。</p>
		<p>输入命令<code>taskkill /f /im vmware-vmx.exe</code> 并回车，强制结束所有虚拟机核心进程。</p>	
	    <p><strong>停止VMware服务:</strong></p>
		<p>按 Win + R，输入<code>services.msc</code>并回车。</p>
		<p>在服务列表中找到所有以 "VMware" 开头的服务，逐个右键点击，选择 “停止”。</p>
	    <h4>（2）执行卸载--两种方式选择其一</h4>
	    <p><strong>方式A：</strong>通过控制面板卸载</p>
		<p>按 Win + R，输入 control 并回车，打开控制面板。</P>
        	<p>点击 “程序和功能”（或“卸载程序”）。</P>
		<p>在列表中找到 “VMware Workstation”，右键点击并选择 “卸载/更改”。</P>
		<p>在弹出的向导中选择 “删除”，然后按提示点击“下一步”直至完成。</P>
	    <p><strong>方式B：</strong>通过原始安装包卸载</p>
		<p>找到你当初下载的VMware Workstation安装程序（.exe文件）。如果没有，则去官网重新下载一个相同版本的安装包。</p>
		<p>右键点击安装包，选择 “以管理员身份运行”。</p>
		<p>安装程序启动后，选择 “删除 (Remove)” 选项，然后跟随向导完成卸载。</p>
	    <h4>（3）清理残留文件和文件夹</h4>
	    <p>卸载完成后，需要手动清理程序残留和虚拟机数据。</p>
	    <p><strong>删除程序安装目录</p></strong>
		<p>默认路径</p>
		<p>C:\Program Files\VMware</p>
		<p>C:\Program Files (x86)\VMware</p>
            <p><strong>删除用户数据和虚拟机文件（此操作不可逆，请确认是否保留旧虚拟机）</p></strong>
		<p>C:\Users\你的用户名\Documents\Virtual Machines</p>
                <p>你也可以直接在文件资源管理器的地址栏输入 %userprofile%\Documents\Virtual Machines 快速访问。</p>
            <h4>（4）清理注册表--彻底清理</h4>
	    	<p>按 Win + R，输入<code>regedit</code>并回车，打开注册表编辑器。</p>
                <p>导航到以下路径，找到并删除与 VMware 或 VMware, Inc. 相关的项：</p>
                <p>HKEY_CURRENT_USER\SOFTWARE\ （查找 VMware, Inc. 文件夹）</p>
                <p>HKEY_LOCAL_MACHINE\SOFTWARE\ （查找 VMware, Inc. 文件夹）</p>
            <h4>（5）重启电脑</h4>
		<p>确保更改生效</p>
      	</li>
        </ol>
    </div>
<p>2. 安装Git的三个软件包</P>
    <div style="margin-left: 2em;">
	<pre class="forest-code"><code>sudo apt install git -y</code></pre>
	<p>git：Git 主程序</p>
	<p>git-man：Git 的帮助文档</p>
	<p>liberror-perl：Git 依赖的一个 Perl 语言库</p>
	<p>验证安装</p>
        <pre class="forest-code"><code>git--version</code></pre>
    </div>
<p>3. 安装Node.js</p>
    <div style="margin-left: 2em;">
	<p>添加NodeSource 仓库</p>
	<pre class="forest-code">curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash <code></code></pre>
	<p>如果显示Command 'curl' not found, but can be installed with:sudo apt install curl，是由于Ubuntu 最小化安装时没有自带 curl，curl 是一个用来下载文件的工具，就像浏览器一样，只不过是在命令行里工作。</p>
	<p>安装curl</p>
	<pre class="forest-code">sudo apt install curl -y<code></code></pre>
	<p>安装后便可重新执行上一命令</p>
	<p>安装Node.js</p>
	<pre class="forest-code">sudo apt install nodejs -y<code></code></pre>
	<p>验证安装</p>
	<pre class="forest-code"><code>node -v</code></pre>
	<pre class="forest-code"><code>npm -v</code></pre>
	<p>显示版本号说明安装成功</p>
    </div>
<p class="normal-text">二、博客框架安装</p>
<p>在第一部分我们已经把撰写博客所需的环境安装好了，接下来需要给博客安装一个初始框架，有了框架才能真正录入内容。</p>
<p>1. 安装Hexo</p>
    <div style="margin-left: 2em;">
	<p>安装hexo命令行工具</p>
	<pre class="forest-code"><code>sudo npm install -g hexo-cli</code></pre>
	<p>验证安装</p>
	<pre class="forest-code"><code>hexo version</code></pre>
    </div>
<p>2. 初始化博客</p>
    <div style="margin-left: 2em;">
	<pre class="forest-code"><code>hexo init myblog
cd ~/myblog
npm install</code></pre>
	<p>显示INFO Start blogging with Hexo! 就说明博客初始化成功</p>
    </div>
<p>3. 本地预览</p>
    <div style="margin-left: 2em;">
	<p>查看博客目录</p>
	<pre class="forest-code"><code>cd ~/myblog
ls -la</code></pre>
    	<p>其中/myblog/source/便是存储文章的文件夹</p>
    </div>
<p class="normal-text">三、部署上线</p>
<p>最后一步是将我们的初始化博客部署上线，实现在浏览器输入网址便可看到博客的效果，将我们的博客和域名连接。</p>
<p>1. GitHub配置</p>
    <div style="margin-left: 2em;">
	<p>此时需要回到主机注册Github账号并登录，<a href="https://github.com">GitHub官网</a></p>
	<p>点击右上角的 "+" 号 → "New repository"。</p>
	<p>Repository name填写[你的用户名.github.io]</p>
	<p>Choose visibility *选择[public]</p>
	<p>Add README勾选，然后点击create repository</p>
	<p>回到Ubuntu终端</p>
	<p>在myblog目录下配置git身份</p>
	<pre class="forest-code"><code>Cd ~/myblog
git config --global user.name "你的GitHub用户名"
git config --global user.email "你注册的邮箱"</code></pre>
	<p>配置正确后，初始化仓库，添加所有文件并提交</p>
	<pre class="forest-code"><code>git init
git add .
git commit -m "first commit"</code></pre>
	<p>回到主机登录GitHub，复制仓库的SSH地址。</p>
	<p>打开浏览器，进入你的仓库：<a href="https://github.com/lindenfird00/lindenfird00.github.io" target="_blank">https://github.com/lindenfird00/lindenfird00.github.io</a></p>
	<p>点击绿色的 "Code" 按钮，确保选中 "SSH" 标签，复制地址（类似 <code>git@github.com:lindenfird00/lindenfird00.github.io.git</code>）</p>
        <p>新账号还没有添加SSH公钥，需要生成一对SSH密钥：</p>
        <pre class="forest-code"><code>cd ~/myblog
ssh-keygen -t ed25519 -C "你的GitHub邮箱"</code></pre>
	<p>然后你会看到这样的提示：</p>
	<pre><code>Generating public/private ed25519 key pair.
Enter file in which to save the key (/home/linden/.ssh/id_ed25519):</code></pre>
        <p>直接按回车，接受默认位置。接着系统会问：</p>
        <pre><code>Enter passphrase (empty for no passphrase):
Enter same passphrase again:</code></pre>
        <p>这里也直接按回车，不设置密码。</p>
	<p>生成成功后用命令查看公钥：</p>
        <pre class="forest-code"><code>cat ~/.ssh/id_ed25519.pub</code></pre>
        <p>你会看到一串以 <code>ssh-ed25519</code> 开头、以你的邮箱结尾的长字符串。用鼠标选中它复制。</p>
        <p>回到主机浏览器，登录 GitHub：</p>
        <p>点击右上角你的头像 → Settings → 左侧菜单栏找到 SSH and GPG keys → 点击 "New SSH key"</p>
        <p>填写表单：</p>
        <ul style="margin-left: 2em;">
		<li><strong>Title</strong>：给你的密钥起个名字，比如 <code>Ubuntu虚拟机</code></li>
		<li><strong>Key type</strong>：保持默认的 Authentication Key</li>
		<li><strong>Key</strong>：把刚才复制的公钥内容粘贴进去</li>
        </ul>
        <p>点击 "Add SSH key"，可能会提示输入 GitHub 密码确认。</p>
        <p>添加成功后回到Ubuntu终端，测试连接：</p>
	<pre class="forest-code"><code>ssh -T git@github.com</code></pre>
        <p>如果问 <code>Are you sure you want to continue connecting (yes/no)?</code>，输入 <code>yes</code> 回车。</p>
	<p>看到 <code>You've successfully authenticated</code> 说明成功。</p>
	<p>添加远程仓库并推送：</p>
	<pre class="forest-code"><code>git remote add origin git@github.com:lindenfird00/lindenfird00.github.io.git
git push -u origin master</code></pre>
	<p>你会看到类似这样的输出：</p>
	<pre><code>Enumerating objects: 11, done.
Counting objects: 100% (11/11), done.
Delta compression using up to 2 threads
Compressing objects: 100% (10/10), done.
Writing objects: 100% (11/11), 23.45 KiB | 2.34 MiB/s, done.
Total 11 (delta 0), reused 0 (delta 0)
To github.com:lindenfird00/lindenfird00.github.io.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.</code></pre>
        <p>最后，打开浏览器访问：</p>
        <p><code>https://lindenfird00.github.io</code></p>
    </div>
<p>2. Netlify配置</p>
<div style="margin-left: 2em;">
    <p>在 Windows 浏览器中打开 <a href="https://app.netlify.com" target="_blank">https://app.netlify.com</a></p>
    <p>点击 "Sign up"，选择 "GitHub" 作为登录方式，授权 Netlify 访问你的 GitHub 账号。</p>
    <p>登录成功后：</p>
    <ol>
        <li>点击 "Add new site" → "Import an existing project"</li>
        <li>选择 "GitHub" 作为 Git 提供商</li>
        <li>授权 Netlify 访问你的仓库（可以选择只授权 <code>lindenfird00.github.io</code>）</li>
        <li>在仓库列表中找到并点击你的博客仓库</li>
    </ol>
    <p>在 "Review configuration" 页面，配置构建参数：</p>
    <ul>
        <li><strong>Build command</strong>：<code>hexo generate</code> 或 <code>npm run build</code></li>
        <li><strong>Publish directory</strong>：<code>public</code></li>
    </ul>
    <p>点击 "Deploy" 按钮，等待 1-2 分钟。</p>
    <p>部署完成后，Netlify 会分配一个二级域名，格式如：</p>
    <p><code>https://随机名称.netlify.app</code></p>
    <p>点击这个域名，你应该能看到和本地完全一样的博客页面！</p>
</div>


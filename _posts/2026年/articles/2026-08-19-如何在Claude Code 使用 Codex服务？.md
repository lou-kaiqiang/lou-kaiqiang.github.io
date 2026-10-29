---
layout: post
title: "如何在Claude Code 使用 Codex服务？"
date: 2026-08-19
categories: ["方法工具"]
tags: ["人工智能", "Claude Code", "Codex"]
author: "路见川"
mathjax: false
description: "最近，我的两个Claude账号都被封了，无奈之下，只能选择次选方案，OpenAI plus账户。 OpenAI plus以上用户每月会赠送一定的codex额度，之前我是在terminal里面使用codex命令，然后可以在本地文件夹做一些任务。"
---
![封面]({{ "/assets/2026-08-19-如何在Claude Code 使用 Codex服务？/images/封面图片.jpg" | relative_url }})

最近，我的两个Claude账号都被封了，无奈之下，只能选择次选方案，OpenAI  plus账户。

OpenAI plus以上用户每月会赠送一定的codex额度，之前我是在terminal里面使用codex命令，然后可以在本地文件夹做一些任务。

现在，由于Claude code在CLI方面是最强大的，我想要仅仅在命令行内使用程序命令就完成很多工作，比如agents，skills，我就想，能否用Claude code来调用codex 的额度，实现一举两得的目的。

然后，我就发现了cc switch这个中转站，具体操作，可以进[官网](https://ccswitch.io/zh/)浏览。

其实，今天由于付费AI的存在，任何你遇到的问题几乎都能被解决。
## 安装工作
按照官方的操作，你应该已经做好了以下工作。

- 安装 Node.js

- 安装CLI工具，Claude code

- 安装好了cc-switch
  安装后正常可以进入app，页面：

  ![Pasted image 20260819220238]({{ "/assets/2026-08-19-如何在Claude Code 使用 Codex服务？/images/Pasted image 20260819220238.png" | relative_url }})

## 配置工作

配置的前提是，你已经开通了 ChatGPT plus/pro会员。

1. 打开cc-switch，点击左上角⚙️按钮，点击“Routing”路由
2. 打开“Routing Master Switch”路由器总开关，打开第一个“claude”按钮
3. ![Pasted image 20260819221205.png]({{ "/assets/2026-08-19-如何在Claude Code 使用 Codex服务？/images/Pasted image 20260819221205.png" | relative_url }})
4. 回到首页，点击“+”
5. 在Claude Provider中找到“Codex”
6. 划到下面，点击“Sign in with ChatGPT”使用ChatGPT登陆
![Pasted image 20260819221718.png]({{ "/assets/2026-08-19-如何在Claude Code 使用 Codex服务？/images/Pasted image 20260819221718.png" | relative_url }})
7. 登陆ChatGPT后，输入提示的8位设备验证码
8. 点击这里的“open terminal”按钮，然后随便选择一个文件夹，点击“打开”
![Pasted image 20260819222419.png]({{ "/assets/2026-08-19-如何在Claude Code 使用 Codex服务？/images/Pasted image 20260819222419.png" | relative_url }})
9. 进去terminal后，回车两下确认默认设置后，就进入正式页面了
![Pasted image 20260819222625.png]({{ "/assets/2026-08-19-如何在Claude Code 使用 Codex服务？/images/Pasted image 20260819222625.png" | relative_url }})

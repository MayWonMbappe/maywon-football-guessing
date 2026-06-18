# Netlify 部署说明

GitHub 仓库根目录必须直接保存解压后的站点文件，不要把
`football-netlify-root.zip` 当成仓库中的网站内容。

如使用 Netlify 手动部署，可以上传交付包，但部署完成后必须在
Deploy File Browser 根部确认看到解压后的 `index.html`、`_redirects`
和其他网站文件；如果只看到 ZIP 文件，说明部署方式错误。

压缩包根目录已经直接包含：

- `index.html`
- `_redirects`
- `netlify.toml`
- `app.js`
- `football-data.js`
- `football-extra-data.js`
- `styles.css`
- `assets/`

不要把网站文件再套进 `football-netlify-root/` 子目录。部署完成后，
在 Netlify 的 Deploy File Browser 中确认根目录能直接看到
`index.html` 和 `_redirects`。

本网站是纯静态单页网站，不需要构建命令。`_redirects` 内容为：

```text
/* /index.html 200
```

本版本已补充 2026 世界杯 48 队正式名单、知名退役及生涯后期球星，
并为中超中国球员补齐中文名。

本次算法修订还包括：

- 将错误的 `United Kingdom` 球员国籍归一为实际代表队国籍，消除与
  England、Scotland、Wales、Northern Ireland 混用的问题。
- 明确区分“国家队参加 2022 世界杯”和“球员本人参加世界杯正赛”。
- 保留所有匹配率达到 90% 的候选继续参与区分，不因候选只剩 2–3 人
  就抢先猜测。
- 第 35 题仍难区分时提醒用户提供更明确答案。
- 常规问题耗尽后，交替使用球队、名字字母、队友问题，并启用绝对排除。
- 年龄统一按数据中的整岁数判断；25–29 岁包含 25 岁和 29 岁，
  30 岁起才进入 30+ 分段。
- 删除旧的无可提问结束流程；常规问题失效时会立即启动压箱底区分步骤，
  并扩充同队不同队友问题以避免过早耗尽。
- 63 条原始 `United Kingdom` 记录已全部归一到 England、Scotland、
  Wales、Northern Ireland；题库会直接丢弃 `United Kingdom` 国籍问题。
- “现在是否与某人同队”只会选择现役球员。退役名宿改为具体姓名的
  知名球队经历问题，例如是否效力过 Ronaldinho 效力过的 Barcelona。

更新日期：2026-06-18。

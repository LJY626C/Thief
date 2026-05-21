// 替换完整单词和句子的工具函数
export interface ReplaceConfig {
  originalText: string;
  newText: string;
}

// 安全替换完整单词和句子
export function replaceWholeWords(html: string, original: string, replacement: string): string {
  if (!original) return html;

  // 转义正则表达式特殊字符
  const escapedOriginal = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // 匹配完整单词（考虑中文语境：单词边界、标点符号、空格等）
  const wordRegex = new RegExp(
    `(^|\\s|>|,|\\.|!|\\?|;|:|\\(|\\)|\\[|\\]|\\{|\\}|\"|'|/|\\\\|-)(${escapedOriginal})($|\\s|>|,|\\.|!|\\?|;|:|\\(|\\)|\\[|\\]|\\{|\\}|\"|'|/|\\\\|-)`,
    'g'
  );

  return html.replace(wordRegex, `$1${replacement}$3`);
}

// 批量替换信息
export function replaceAllInfo(
  html: string,
  companyNameConfig: ReplaceConfig,
  phoneConfig: ReplaceConfig,
  emailConfig: ReplaceConfig,
  addressConfig: ReplaceConfig
): string {
  let result = html;

  // 替换公司名称
  result = replaceWholeWords(result, companyNameConfig.originalText, companyNameConfig.newText);

  // 替换电话
  result = replaceWholeWords(result, phoneConfig.originalText, phoneConfig.newText);

  // 替换邮箱
  result = replaceWholeWords(result, emailConfig.originalText, emailConfig.newText);

  // 替换地址
  result = replaceWholeWords(result, addressConfig.originalText, addressConfig.newText);

  return result;
}

// 替换所有外部链接为 #
export function replaceExternalLinks(html: string): string {
  // 匹配所有 a 标签的 href 属性
  const linkRegex = /<a\s+([^>]*?)href=("|')([^"']+)("|')([^>]*?)>/gi;
  
  return html.replace(linkRegex, (match, before, quote1, href, quote2, after) => {
    // 检查是否是内部链接或已替换的 #
    if (href.startsWith('#') || href.startsWith('/') || href.startsWith('javascript:')) {
      return match;
    }
    // 替换为 #
    return `<a ${before}href="${quote1}#${quote2}${after}>`;
  });
}

// 替换图片 src（支持替换 LOGO 等图片
export function replaceLogoImages(
  html: string,
  logoPatterns: string[],
  newLogoSrc: string
): string {
  let result = html;
  
  logoPatterns.forEach(pattern => {
    if (pattern) {
      // 替换匹配的图片 src
      const imgRegex = new RegExp(
        `<img([^>]*?)src=("|')([^"']*${pattern}[^"']*)("|')`,
        'gi'
      );
      result = result.replace(imgRegex, `<img$1src="${newLogoSrc}"`);
    }
  });

  return result;
}

// 完整的内容处理管道
export function processClonedWebsite(
  html: string,
  configs: {
    companyName: ReplaceConfig;
    phone: ReplaceConfig;
    email: ReplaceConfig;
    address: ReplaceConfig;
    logoPatterns: string[];
    newLogoSrc: string | null;
  }
): string {
  let result = html;

  // 替换公司信息
  result = replaceAllInfo(
    result,
    configs.companyName,
    configs.phone,
    configs.email,
    configs.address
  );

  // 替换外部链接
  result = replaceExternalLinks(result);

  // 替换 LOGO 图片
  if (configs.newLogoSrc) {
    result = replaceLogoImages(result, configs.logoPatterns, configs.newLogoSrc);
  }

  return result;
}

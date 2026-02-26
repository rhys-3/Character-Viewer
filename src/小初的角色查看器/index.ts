import './index.scss';

$(() => {
const raceColorMap = {
          神祗: '#FFFFFF', // White (Brighter)

          // Dragonkind
          龙族: '#FFD700', // Gold
          龙姬: '#FFD700',
          龙裔: '#FFA500', // Orange (Brighter than B8860B)
          巨龙: '#FFD700',
          古龙: '#FFD700',
          亚龙: '#FFAE42', // Yellow Orange (Brighter)

          // Blood/Undead
          血姬: '#FF0000', // Red (Brighter than DC143C)
          血族: '#DC143C', // Crimson (Brighter than 8B0000)
          亡灵种族: '#32CD32', // LimeGreen (Brighter than 2E8B57)
          不死生物: '#32CD32',

          // Winged
          翼民: '#00BFFF', // DeepSkyBlue (Brighter than 87CEFA)
          翼族: '#00BFFF',
          堕羽民: '#9370DB', // MediumPurple (Brighter than 708090)
          女妖: '#FF1493', // DeepPink (Brighter than 708090)

          // Human/Demi-human
          人类: '#FFDAB9', // PeachPuff (Brighter than DEB887)
          矮人: '#D2691E', // Chocolate (Brighter than A0522D)
          半身人: '#FFD700', // Gold (Brighter than DAA520)

          // Elves/Fae
          精灵: '#00FF7F', // SpringGreen (Brighter than 8FBC8F)
          光翅妖精: '#FFFF00', // Yellow (Brighter than FFFACD)
          汐海妖精: '#00FFFF', // Cyan (Brighter than AFEEEE)
          妖精: '#FF00FF', // Magenta (Brighter than FF69B4)
          宁芙: '#FF00FF',

          // Beast/Monster
          兽族: '#FF4500', // OrangeRed (Brighter than B22222)
          黑角民: '#00CED1', // DarkTurquoise (Brighter than 2F4F4F)
          蛇女: '#00FF7F', // SpringGreen (Brighter than 20B2AA)
          半人马: '#FF8C00', // DarkOrange (Brighter than CD853F)
          人鱼: '#00FFFF', // Cyan (Brighter than 00CED1)
          地精: '#32CD32', // LimeGreen (Brighter than 556B2F)
          魔物: '#8A2BE2', // BlueViolet (Brighter than 483D8B)
          深渊魔族: '#9400D3', // DarkViolet (Brighter than 4B0082)
          异域生物: '#FF00FF', // Magenta (Brighter than 9400D3)

          // Giants
          巨人: '#D2691E', // Chocolate (Brighter than 8B4513)
          半巨人: '#D2691E',
          小巨人: '#D2691E',
          霜巨人: '#00BFFF', // DeepSkyBlue (Brighter than B0C4DE)
          泰坦人族: '#FFD700', // Gold (Brighter than B8860B)
          山妖: '#DAA520', // Goldenrod (Brighter than 696969)
          食人魔: '#7CFC00', // LawnGreen (Brighter than 556B2F)
          巨魔: '#7CFC00',
          雪怪: '#E0FFFF', // LightCyan (Brighter than F0F8FF)

          // Spirits/Constructs/Others
          诗灵: '#EE82EE', // Violet (Brighter than D8BFD8)
          英灵: '#00BFFF', // DeepSkyBlue (Brighter than 1E90FF)
          从者: '#00BFFF',
          构装体: '#00CED1', // DarkTurquoise (Brighter than C0C0C0)
          人造生物: '#00FF7F', // SpringGreen (Brighter than 7FFFD4)
          元素生物: '#FF0000', // Red (Brighter than FF4500)
          植物生物: '#00FF00', // Lime (Brighter than 228B22)
          不定形生物: '#7CFC00', // LawnGreen (Brighter than 32CD32)

          其他: '#E0E0E0', // Gainsboro (Brighter than C0C0C0)
        };
        const tierColorMap = {
          1: '#57595D', // Iron
          2: '#50C878', // Uncommon Green
          3: '#2196F3', // Magic Blue
          4: '#9932CC', // Dark Orchid - Slightly deeper than previous purple to look more "Arcane"
          5: '#FFD700', // Divine Gold
          6: '#DC143C', // Legendary Red
          7: '#00FFFF', // Transcendent Cyan
        };
        const attributeLabelMap = { 力量: '力', 敏捷: '敏', 体质: '体', 智力: '智', 精神: '精' };

        function hexToRgb(hex) {
          if (!hex || typeof hex !== 'string') return '128, 128, 128';
          hex = hex.replace(/^#/, '');
          if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
          const r = parseInt(hex.substring(0, 2), 16);
          const g = parseInt(hex.substring(2, 4), 16);
          const b = parseInt(hex.substring(4, 6), 16);
          return `${r}, ${g}, ${b}`;
        }

        function getSmartArray(input) {
          if (input === undefined || input === null) return [];
          if (Array.isArray(input)) return input;

          const str = String(input).trim();
          if (!str || str.toLowerCase() === 'null' || str.toLowerCase() === 'none') return [];

          let processed = str.replace(/\]\s*\[/g, '], [');
          processed = processed.replace(/^[\s\["']+|[\s\]"']+$/g, '');
          const items = processed.split(/[,;|，；、]/);

          return items
            .map(s => {
              return s.trim().replace(/^['"\[\(]+|['"\]\)]+$/g, '');
            })
            .filter(s => s && s !== 'null');
        }

        function cleanYaml(yamlStr) {
          if (!yamlStr) return '';
          // 基础符号清洗（只修复会导致 YAML 结构解析失败的字符；不替换正文标点）
          yamlStr = yamlStr
            .replace(/\u00A0/g, ' ')
            .replace(/\t/g, '  ')
            .replace(/】/g, ']')
            .replace(/【/g, '[');

          const lines = yamlStr.split('\n');
          const sensitiveKeys = [
            '身份',
            '职业',
            '性格',
            '喜爱',
            '外貌特质',
            '衣物装饰',
            '背景故事',
            '描述',
            '效果',
            '标签',
            '消耗',
            '类型',
            '品质',
            '神位',
            '名称',
            '姓名',
            '种族',
            '等级',
            '生命层级',
          ];
          const attrKeys = ['力量', '敏捷', '体质', '智力', '精神'];

          const cleanedLines = lines.map(line => {
            // 只规范 YAML 结构分隔符：把“键：值”的全角冒号变为半角冒号；不动正文标点（，；等）
            line = line.replace(/^(\s*)(-\s*)?([-\w\u4e00-\u9fa5]+)\s*：/, (_m, indent, dash, key) => {
              return `${indent}${dash || ''}${key}:`;
            });

            // 支持普通键值行与 "- 键: 值" 的列表对象行
            const match = line.match(/^(\s*)(-\s*)?([-\w\u4e00-\u9fa5]+)\s*:\s*(.*)$/);
            if (!match) return line;

            const indent = match[1];
            const dash = match[2] || '';
            const key = match[3];
            let val = match[4].trim();

            if (!val) return line;
            if (val.startsWith('|') || val.startsWith('>')) return line;

            if (attrKeys.some(k => key.includes(k))) {
              if ((/[+=]/.test(val) || val.includes('{')) && !/^["'].*["']$/.test(val)) {
                val = val.replace(/"/g, '\\"');
                return `${indent}${dash}${key}: "${val}"`;
              }
            }

            const isSensitive = sensitiveKeys.some(k => key.includes(k));
            const hasDangerousChars = /[\{\}\[\]]/.test(val);
            const hasQuoteInside = val.includes('"');

            const isFullyQuoted = /^["'].*["']$/.test(val);

            if ((isSensitive || hasDangerousChars || hasQuoteInside) && !isFullyQuoted) {
              val = val.replace(/"/g, '\\"');
              return `${indent}${dash}${key}: "${val}"`;
            }

            return line;
          });
          return cleanedLines.join('\n');
        }

        function escapeHtml(str) {
          const div = document.createElement('div');
          div.textContent = String(str ?? '');
          return div.innerHTML;
        }

        function visualizeForDisplay(str) {
          // 让不可见字符“可见”，方便玩家定位
          return String(str ?? '')
            .replace(/\t/g, '⇥') // TAB
            .replace(/\u00A0/g, '⍽'); // NBSP
        }

        function buildFriendlyYamlError(e, originalYaml, cleanedYaml) {
          const msg = escapeHtml((e && (e.reason || e.message)) || String(e));
          const mark = e && e.mark;

          if (!mark || typeof mark.line !== 'number') {
            return `<div>${msg}</div>`;
          }

          const lineIndex = mark.line;
          const column = typeof mark.column === 'number' ? mark.column : 0;

          const originalLines = String(originalYaml ?? '').split('\n');
          const cleanedLines = String(cleanedYaml ?? '').split('\n');

          const originalLine = originalLines[lineIndex] ?? '';
          const cleanedLine = cleanedLines[lineIndex] ?? '';

          const cleanVisualRaw = visualizeForDisplay(cleanedLine);
          const originalVisualRaw = visualizeForDisplay(originalLine);

          const safeCleanLine = escapeHtml(cleanVisualRaw);
          const safeOriginalLine = escapeHtml(originalVisualRaw);

          // caret：列号以 jsyaml 的 column 为准（基于“用于解析的文本”）
          const caretPad = ' '.repeat(Math.max(0, Math.min(column, cleanVisualRaw.length)));
          const caretLine = `${caretPad}^`;

          const symbol = cleanedLine.charAt(column) || '';
          const codePoint = symbol ? symbol.codePointAt(0).toString(16).toUpperCase().padStart(4, '0') : '';

          const symbolInfo = symbol
            ? `出错位置字符（用于解析的文本）：<span style="color:#ff6b6b;font-weight:700;">${escapeHtml(
                symbol,
              )}</span> <span style="opacity:0.8">(U+${codePoint})</span>`
            : `出错位置在行尾附近（常见原因：缺少引号/括号/冒号，或缩进不对齐）`;

          // 上下文（原始文本）
          const start = Math.max(0, lineIndex - 2);
          const end = Math.min(originalLines.length - 1, lineIndex + 2);
          const ctx = [];
          for (let i = start; i <= end; i++) {
            const ln = String(i + 1).padStart(4, ' ');
            const text = escapeHtml(visualizeForDisplay(originalLines[i] ?? ''));
            const isErr = i === lineIndex;
            ctx.push(`${isErr ? '➡️' : '  '} ${ln} | ${text}`);
          }

          // 简单启发式提示
          const hints = [];
          if (/\t/.test(originalLine)) hints.push('该行包含 TAB（⇥）：请用空格替换 TAB，YAML 缩进必须用空格。');
          if (/^\s*([-\w\u4e00-\u9fa5]+)\s*：/.test(originalLine))
            hints.push('该行 key 使用了全角冒号（：）：请改为半角冒号（:）。');
          if (/^\s*-\s*([-\w\u4e00-\u9fa5]+)\s*：/.test(originalLine))
            hints.push('该行列表项 key 使用了全角冒号（：）：请改为半角冒号（:）。');
          if (/[【】]/.test(originalLine)) hints.push('发现全角方括号（【】）：请改为 []。');

          const hintsHtml =
            hints.length > 0
              ? `<div style="margin-top:10px;">
                         <div style="font-weight:700;margin-bottom:6px;">可能的修复方向</div>
                         <ul style="margin:0 0 0 18px;padding:0;line-height:1.5;">
                           ${hints.map(h => `<li>${escapeHtml(h)}</li>`).join('')}
                         </ul>
                       </div>`
              : '';

          return `
                  <div style="margin-bottom:6px;"><b>定位</b>：第 ${lineIndex + 1} 行，第 ${column + 1} 列</div>
                  <div style="margin-bottom:8px;opacity:0.95;"><b>原因</b>：${msg}</div>
                  <div style="margin-bottom:10px;">${symbolInfo}</div>

                  <div style="font-weight:700;margin-bottom:6px;">用于解析的该行（已自动清洗）</div>
                  <pre style="margin:0; padding:10px; border-radius:6px; background:rgba(0,0,0,0.35); border:1px solid rgba(255,255,255,0.12); white-space:pre; overflow:auto;">${safeCleanLine}
      ${escapeHtml(caretLine)}</pre>

                  <details style="margin-top:10px;">
                    <summary style="cursor:pointer; user-select:none;">查看原始数据附近几行（带行号）</summary>
                    <pre style="margin-top:8px; padding:10px; border-radius:6px; background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.10); white-space:pre; overflow:auto;">${ctx.join(
                      '\n',
                    )}</pre>
                  </details>

                  <details style="margin-top:10px;">
                    <summary style="cursor:pointer; user-select:none;">查看原始该行</summary>
                    <pre style="margin-top:8px; padding:10px; border-radius:6px; background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.10); white-space:pre; overflow:auto;">${safeOriginalLine}</pre>
                  </details>

                  <div style="margin-top:10px; font-size:0.85rem; opacity:0.85;">
                    注：列号基于“用于解析的文本（已清洗）”，通常与原始文本一致；若行首被自动修正（例如把“：”变为“:”），列号可能会有极小偏差。
                  </div>

                  ${hintsHtml}
                `;
        }

        function parseRobust(yamlStr) {
          const cleaned = cleanYaml(yamlStr);
          try {
            const data = jsyaml.load(cleaned);
            if (!data) throw new Error('解析结果为空');
            return { success: true, data: data };
          } catch (e) {
            console.error('Parsing failed:', e);
            return { success: false, error: buildFriendlyYamlError(e, yamlStr, cleaned) };
          }
        }

        function hasText(val) {
          if (!val) return false;
          const s = String(val).trim().toLowerCase();
          return s !== '' && s !== 'null' && s !== 'none' && s !== '[]';
        }

        function hasArrayContent(arr) {
          if (!arr || !Array.isArray(arr)) return false;
          return arr.length > 0;
        }

        function parseAttributeValue(val) {
          if (val === undefined || val === null) return 0;
          const str = String(val).trim();
          if (str.includes('=')) {
            const parts = str.split('=');
            const lastPart = parts[parts.length - 1].trim();
            return parseInt(lastPart) || 0;
          }
          return parseInt(str) || 0;
        }

        function renderSheet(data, originalYaml) {
          const wrapper = document.querySelector('.card-wrapper');
          if (!wrapper) return;

          const tierMap = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7 };
          const tierStr = (data.生命层级 || '').toString().match(/第(.)层级/);
          const tier = tierStr ? tierMap[tierStr[1]] : parseInt(data.生命层级) || 1;

          let raceKey = '其他';
          const race = data.种族 || '其他';
          for (const k in raceColorMap) {
            if (race.includes(k)) {
              raceKey = k;
              break;
            }
          }
          const raceHex = raceColorMap[raceKey];
          const tierHex = tierColorMap[tier] || tierColorMap[1];

          const root = document.documentElement;
          root.style.setProperty('--race-color', raceHex);
          root.style.setProperty('--race-color-rgb', hexToRgb(raceHex));
          root.style.setProperty('--tier-color', tierHex);
          root.style.setProperty('--tier-color-rgb', hexToRgb(tierHex));

          const frameLayer = document.getElementById('frame-layer');

          // Reset classes
          wrapper.className = 'card-wrapper';
          wrapper.classList.add('tier-' + tier);

          if (tier >= 5) {
            frameLayer.style.display = 'flex';
            wrapper.classList.add('high-tier');
            // Split frame into Top (Arc) and Body (Sides)
            // Top: Fixed height, preserves arc shape
            // Body: Stretches vertically
            frameLayer.innerHTML = `
                     <svg class="frame-svg frame-top" viewBox="0 0 400 100" preserveAspectRatio="none">
                       <!-- Top Arc -->
                       <path d="M 5,100 A 195,80 0 0,1 395,100" />
                       <path d="M 15,100 A 185,70 0 0,1 385,100" stroke-width="1" opacity="0.6" />
                       <!-- Decorations -->
                       <line x1="60" y1="60" x2="60" y2="90" stroke-width="1" />
                       <line x1="340" y1="60" x2="340" y2="90" stroke-width="1" />
                       <circle cx="60" cy="92" r="3" fill="var(--tier-color)" stroke="none"/>
                       <circle cx="340" cy="92" r="3" fill="var(--tier-color)" stroke="none"/>
                       <path d="M 200,2 L 205,15 L 220,20 L 205,25 L 200,38 L 195,25 L 180,20 L 195,15 Z" fill="var(--tier-color)" stroke="none" />
                     </svg>
                     <svg class="frame-svg frame-body" viewBox="0 0 400 100" preserveAspectRatio="none">
                       <!-- Vertical Lines extending down -->
                       <line x1="5" y1="0" x2="5" y2="100" />
                       <line x1="395" y1="0" x2="395" y2="100" />
                       <!-- Inner Faint Lines -->
                       <line x1="15" y1="0" x2="15" y2="98" stroke-width="1" opacity="0.6" />
                       <line x1="385" y1="0" x2="385" y2="98" stroke-width="1" opacity="0.6" />
                       <!-- Bottom Closure (simulated at end of stretch) -->
                       <line x1="5" y1="100" x2="395" y2="100" />
                     </svg>
                   `;
          } else {
            frameLayer.style.display = 'none';
            frameLayer.innerHTML = '';
          }

          addImportButton(data, originalYaml);
          document.querySelector('[data-name]').textContent = data.姓名 || 'Unknown';
          document.querySelector('[data-level]').textContent = `Lv.${data.等级 || '?'}`;
          document.querySelector('[data-race]').textContent = race;

          const formatList = val => getSmartArray(val).join(' / ') || '-';
          document.querySelector('[data-identity]').textContent = formatList(data.身份);
          document.querySelector('[data-class]').textContent = formatList(data.职业);
          document.querySelector('[data-tier-name]').textContent = data.生命层级 || 'Unknown';

          const vitalsContainer = document.querySelector('[data-vitals]');
          const res = data.资源 || data.属性 || {};
          vitalsContainer.innerHTML = `
                  <div class="vital-item hp"><div class="vital-label">HP</div><div class="vital-value">${(
                    res.HP || 0
                  ).toLocaleString()}</div></div>
                  <div class="vital-item mp"><div class="vital-label">MP</div><div class="vital-value">${(
                    res.MP || 0
                  ).toLocaleString()}</div></div>
                  <div class="vital-item sp"><div class="vital-label">SP</div><div class="vital-value">${(
                    res.SP || 0
                  ).toLocaleString()}</div></div>
                `;

          const attributesContainer = document.querySelector('[data-attributes]');
          attributesContainer.innerHTML = '';
          const attributeKeys = ['力量', '敏捷', '体质', '智力', '精神'];
          if (data.属性) {
            attributeKeys.forEach(key => {
              const rawValue = data.属性[key] !== undefined ? String(data.属性[key]) : '0';
              let total = rawValue;
              let formula = '';
              if (rawValue.includes('=')) {
                const parts = rawValue.split('=');
                formula = parts[0].trim();
                total = parts[parts.length - 1].trim();
              }
              const label = attributeLabelMap[key] || key;
              const item = document.createElement('div');
              item.className = 'attribute-item';
              item.innerHTML = `<span class="attribute-name">${label}</span><span class="attribute-total">${total}</span>${
                formula ? `<span class="attribute-formula">${formula}</span>` : ''
              }`;
              if (formula) item.onclick = () => item.classList.toggle('show-formula');
              attributesContainer.appendChild(item);
            });
          }

          const profileContainer = document.querySelector('#tab-profile');
          let profileHtml = '';

          if (data.性格) {
            let personalityText = data.性格;
            if (Array.isArray(personalityText)) {
              personalityText = personalityText.join('，');
            }
            if (typeof personalityText === 'string') {
              personalityText = personalityText.replace(/\n/g, '<br>');
            }
            profileHtml += `<div class="subsection-title">性格</div><div class="story">${personalityText}</div>`;
          }

          if (data.喜爱) {
            const rawLikes = String(data.喜爱);

            // Tag-like input (array / comma/bracket list):
            // Also treat Chinese punctuation lists (，；、) as tags, e.g.
            // 喜爱: |
            //   莎士比亚戏剧，乱点鸳鸯谱，月光，甜食，观众的掌声。
            const looksLikeTagList = Array.isArray(data.喜爱) || rawLikes.includes('[') || /[,;|，；、]/.test(rawLikes);

            if (looksLikeTagList) {
              const likesTagsHtml = createTags(data.喜爱);
              profileHtml += `<div class="subsection-title">喜爱</div><div class="tags-box"><div class="card-tags">${likesTagsHtml}</div></div>`;
            } else {
              const likesText = rawLikes.replace(/\n/g, '<br>');
              profileHtml += `<div class="subsection-title">喜爱</div><div class="story">${likesText}</div>`;
            }
          }

          if (data.外貌特质) {
            const appearance = data.外貌特质.replace(/\n/g, '<br>');
            profileHtml += `<div class="subsection-title">外貌特质</div><div class="story">${appearance}</div>`;
          }
          if (data.衣物装饰) {
            const attire = data.衣物装饰.replace(/\n/g, '<br>');
            profileHtml += `<div class="subsection-title">衣物装饰</div><div class="story">${attire}</div>`;
          }
          profileContainer.innerHTML =
            profileHtml || '<div style="text-align:center;color:#666;padding:20px;">暂无档案信息</div>';

          renderCards(document.querySelector('#tab-skills'), data.技能, createSkillCard);
          renderCards(document.querySelector('#tab-equipment'), data.装备, createEquipmentCard);

          const divinityContainer = document.querySelector('#tab-divinity');
          divinityContainer.innerHTML = '';

          const divData = data.登神长阶 || {};

          const rawDeity = hasText(divData.神位) ? divData.神位 : hasText(data.神位) ? data.神位 : null;
          const rawKingdom = divData.神国 || data.神国;

          const rawElements = hasArrayContent(divData.要素)
            ? divData.要素
            : hasArrayContent(data.要素)
              ? data.要素
              : [];
          const rawPowers = hasArrayContent(divData.权能) ? divData.权能 : hasArrayContent(data.权能) ? data.权能 : [];
          const rawLaws = hasArrayContent(divData.法则) ? divData.法则 : hasArrayContent(data.法则) ? data.法则 : [];

          if (rawDeity) {
            divinityContainer.innerHTML += `<div class="subsection-title" style="border:none; text-align:center; font-size:1.6rem; text-shadow:0 0 10px var(--tier-color); margin-bottom:15px; color:var(--tier-color)">${rawDeity}</div>`;
          }
          if (rawKingdom && hasText(rawKingdom.名称)) {
            const kingdomDesc = (rawKingdom.描述 || '无').replace(/\n/g, '<br>');
            divinityContainer.innerHTML += `<div class="card" style="border-color: var(--tier-color); background: rgba(255,255,255,0.1);"><div class="card-header"><h3 class="card-title" style="color: var(--tier-color); font-size: 1.2rem;">${
              rawKingdom.名称
            }</h3></div><div class="card-body"><p>${kingdomDesc}</p></div></div>`;
          }

          if (rawElements.length > 0) {
            divinityContainer.innerHTML += `<div class="subsection-title">要素</div>`;
            renderCards(divinityContainer, rawElements, createGenericCard);
          }
          if (rawPowers.length > 0) {
            divinityContainer.innerHTML += `<div class="subsection-title">权能</div>`;
            renderCards(divinityContainer, rawPowers, createGenericCard);
          }
          if (rawLaws.length > 0) {
            divinityContainer.innerHTML += `<div class="subsection-title">法则</div>`;
            renderCards(divinityContainer, rawLaws, createLawCard);
          }

          const backContainer = document.querySelector('#tab-backstory');
          if (data.背景故事 && data.背景故事.trim()) {
            const backstory = data.背景故事.replace(/\n/g, '<br>');
            backContainer.innerHTML = `<div class="story">${backstory}</div>`;
          } else {
            backContainer.innerHTML = '<div style="text-align:center;color:#666;padding:20px;">暂无故事</div>';
          }

          initializeTabs(data);

          initCanvasAnimation(tier, raceHex);
        }

        function initializeTabs(data) {
          const tabButtons = document.querySelectorAll('.tab-button');
          const tabContents = document.querySelectorAll('.tab-content');
          let firstVisibleTab = null;

          const divData = data.登神长阶 || {};
          const hasElements = hasArrayContent(divData.要素) || hasArrayContent(data.要素);
          const hasPowers = hasArrayContent(divData.权能) || hasArrayContent(data.权能);
          const hasLaws = hasArrayContent(divData.法则) || hasArrayContent(data.法则);
          const hasDeity = hasText(divData.神位) || hasText(data.神位);
          const hasKingdom = (divData.神国 && hasText(divData.神国.名称)) || (data.神国 && hasText(data.神国.名称));

          const hasDivinity = hasElements || hasPowers || hasLaws || hasDeity || hasKingdom;

          tabButtons.forEach(button => {
            const targetId = button.dataset.tabTarget.substring(1);
            let hasContent = false;
            if (targetId === 'tab-skills' && data.技能?.length > 0) hasContent = true;
            else if (targetId === 'tab-equipment' && data.装备?.length > 0) hasContent = true;
            else if (targetId === 'tab-backstory' && data.背景故事) hasContent = true;
            else if (targetId === 'tab-divinity' && hasDivinity) hasContent = true;
            else if (targetId === 'tab-profile') hasContent = true;

            if (!hasContent) button.style.display = 'none';
            else if (!firstVisibleTab) firstVisibleTab = button;

            button.addEventListener('click', () => {
              tabButtons.forEach(btn => btn.classList.remove('active'));
              tabContents.forEach(content => content.classList.remove('active'));
              button.classList.add('active');
              document.querySelector(button.dataset.tabTarget).classList.add('active');

              const canvas = document.getElementById('particle-canvas');
              const bgLayer = document.querySelector('.card-background-layer');
              if (canvas && bgLayer) {
                requestAnimationFrame(() => {
                  canvas.width = bgLayer.offsetWidth;
                  canvas.height = bgLayer.offsetHeight;
                });
              }
            });
          });
          if (firstVisibleTab) firstVisibleTab.click();
        }

        function renderCards(container, items, cardCreator) {
          if (!container || !items || !Array.isArray(items) || items.length === 0) return;
          items.forEach(item => container.insertAdjacentHTML('beforeend', cardCreator(item)));
        }

        function createTags(tags) {
          const safeTags = getSmartArray(tags)
            .map(tag =>
              String(tag ?? '')
                .trim()
                .replace(/。+$/g, '')
                .trim(),
            )
            .filter(Boolean);
          return safeTags.length > 0 ? safeTags.map(tag => `<span class="card-tag">${tag}</span>`).join('') : '';
        }

        function createSkillCard(item) {
          const costStr = getSmartArray(item.消耗).join(' / ');
          const effect = (item.效果 || '无').replace(/\n/g, '<br>');
          return `<div class="card"><div class="card-header"><h3 class="card-title">${
            item.名称
          }</h3><span class="card-subtitle">${
            item.品质 || ''
          }</span></div><div class="card-body"><div class="card-tags">${createTags(item.标签)}</div>${
            item.类型 ? `<p><span class="card-label">类型:</span> ${item.类型}</p>` : ''
          }${
            costStr ? `<p><span class="card-label">消耗:</span> ${costStr}</p>` : ''
          }<p><span class="card-label">效果:</span> ${effect}</p>${
            item.描述
              ? `<p style="opacity:0.8;font-style:italic;font-size:0.9rem;margin-top:8px; border-top:1px solid rgba(255,255,255,0.15); padding-top:5px;">${item.描述}</p>`
              : ''
          }</div></div>`;
        }

        function createEquipmentCard(item) {
          const effect = (item.效果 || '无').replace(/\n/g, '<br>');
          return `<div class="card"><div class="card-header"><h3 class="card-title">${
            item.名称
          }</h3><span class="card-subtitle">${
            item.品质 || ''
          }</span></div><div class="card-body"><div class="card-tags">${createTags(
            item.标签,
          )}</div><p><span class="card-label">效果:</span> ${effect}</p>${
            item.描述
              ? `<p style="opacity:0.8;font-style:italic;font-size:0.9rem;margin-top:8px; border-top:1px solid rgba(255,255,255,0.15); padding-top:5px;">${item.描述}</p>`
              : ''
          }</div></div>`;
        }
        function createGenericCard(item) {
          const content = (item.效果 || item.描述 || '无').replace(/\n/g, '<br>');
          return `<div class="card" style="border-left-color: var(--tier-color);"><div class="card-header"><h3 class="card-title" style="color:var(--tier-color)">${
            item.名称
          }</h3></div><div class="card-body"><p>${content}</p></div></div>`;
        }
        function createLawCard(item) {
          const passive = (item.被动效果 || '无').replace(/\n/g, '<br>');
          const active = (item.主动效果 || '无').replace(/\n/g, '<br>');
          return `<div class="card" style="border-left-color: var(--tier-color);"><div class="card-header"><h3 class="card-title" style="color:var(--tier-color)">${
            item.名称
          }</h3></div><div class="card-body"><p>${item.描述 || ''}</p>${
            item.被动效果
              ? `<p><span class="card-label" style="color:var(--tier-color)">被动:</span> ${passive}</p>`
              : ''
          }${
            item.主动效果
              ? `<p><span class="card-label" style="color:var(--tier-color)">主动:</span> ${active}</p>`
              : ''
          }</div></div>`;
        }

        function addImportButton(data, originalYaml) {
          const wrapper = document.querySelector('.card-wrapper');
          if (!wrapper || document.getElementById('import-action-btn')) return;

          // 清理旧版本残留（热重载时可能同时存在）
          const oldLore = document.getElementById('save-to-lorebook-btn');
          if (oldLore) oldLore.remove();
          const oldMvu = document.getElementById('save-to-mvu-btn');
          if (oldMvu) oldMvu.remove();

          const button = document.createElement('button');
          button.id = 'import-action-btn';
          button.textContent = '📥';
          button.title = '导入';

          const menu = document.createElement('div');
          menu.id = 'import-action-menu';
          menu.innerHTML = `
                  <button type="button" data-action="mvu">导入到 MVU 变量</button>
                  <button type="button" data-action="worldbook">导入到 聊天世界书</button>
                `;

          const closeMenu = () => menu.classList.remove('show');
          const toggleMenu = () => menu.classList.toggle('show');

          button.addEventListener('click', e => {
            e.stopPropagation();
            toggleMenu();
          });

          menu.addEventListener('click', async e => {
            e.stopPropagation();
            const target = e.target;
            if (!(target instanceof HTMLElement)) return;
            const action = target.getAttribute('data-action');
            if (!action) return;

            closeMenu();

            if (action === 'mvu') {
              await importToMvuVariables(data, button);
            } else if (action === 'worldbook') {
              await saveToChatWorldbook(data, originalYaml, button);
            }
          });

          // Close on outside click / ESC
          document.addEventListener('click', () => closeMenu());
          document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeMenu();
          });

          wrapper.appendChild(menu);
          wrapper.appendChild(button);
        }

        async function saveToChatWorldbook(data, originalYaml, button) {
          const api = window.TavernHelper || window;
          if (typeof api.getOrCreateChatWorldbook !== 'function' || typeof api.createWorldbookEntries !== 'function') {
            alert('错误：未检测到 Worldbook API。');
            return;
          }
          try {
            const oldText = button.textContent;
            button.textContent = '⏳';

            const characterName = data.姓名 || 'Unknown';
            let shortName = characterName.split(/[·\s]/)[0];
            const lorebookKey = shortName && shortName.trim().length > 0 ? shortName : characterName;

            let bookName =
              typeof api.getChatWorldbookName === 'function' ? await api.getChatWorldbookName('current') : null;
            if (!bookName) {
              const now = new Date();
              const timeStr = `${now.getFullYear()}_${(now.getMonth() + 1).toString().padStart(2, '0')}_${now
                .getDate()
                .toString()
                .padStart(2, '0')}_${now.getHours()}h_${now.getMinutes()}m_${now.getSeconds()}s`;
              const desiredName = `命定之诗-charinfo-Chat_Book_${timeStr}`;
              bookName = await api.getOrCreateChatWorldbook('current', desiredName);
            }

            const newEntry = {
              name: characterName,
              enabled: true,
              strategy: { type: 'selective', keys: [lorebookKey] },
              position: { type: 'after_character_definition', order: 152 },
              content: originalYaml,
            };
            await api.createWorldbookEntries(bookName, [newEntry]);

            button.textContent = '✅';
            setTimeout(() => (button.textContent = oldText), 1000);
          } catch (err) {
            console.error('Worldbook Save Error:', err);
            button.textContent = '❌';
            alert('保存失败: ' + err.message);
            setTimeout(() => (button.textContent = '📥'), 1000);
          }
        }

        async function importToMvuVariables(data, button) {
          // Try to find the API in current window or parent
          const api = window.TavernHelper || (window.parent && window.parent.TavernHelper) || window;

          if (!api || typeof api.getVariables !== 'function' || typeof api.insertOrAssignVariables !== 'function') {
            console.error('TavernHelper API not found', {
              windowTavernHelper: window.TavernHelper,
              parentTavernHelper: window.parent?.TavernHelper,
            });
            alert(
              '错误：未检测到 TavernHelper API (getVariables / insertOrAssignVariables)。\n请确保酒馆助手插件已安装并启用。',
            );
            return;
          }

          if (
            !confirm(
              `确定要将角色 "${data.姓名 || 'Unknown'}" 导入到 MVU 变量系统(命定系统.关系列表)吗？\n如果已存在同名角色，将会覆盖其数据。`,
            )
          ) {
            return;
          }

          try {
            const oldText = button.textContent;
            button.textContent = '⏳';

            // Data Transformation Logic
            const charName = data.姓名 || 'Unknown';

            // Helper to ensure string
            const ensureString = val => {
              if (Array.isArray(val)) return val.join(', ');
              return val ? String(val) : '';
            };

            // Helper to ensure array
            const ensureArray = val => {
              return getSmartArray(val);
            };

            // Helper to convert array of objects to object map keyed by name
            // Strict type conversion added based on validation errors
            const arrayToMap = (arr, type) => {
              const map = {};

              if (Array.isArray(arr)) {
                arr.forEach(item => {
                  if (item && item.名称) {
                    const { 名称, ...rest } = item;
                    const processed = { ...rest };

                    // 强制类型转换：标签必须为数组
                    if (processed.标签) {
                      processed.标签 = ensureArray(processed.标签);
                    } else if (type === 'skill' || type === 'equip') {
                      processed.标签 = [];
                    }

                    // 强制类型转换：效果必须为对象 (Record<string, string>)
                    // 仅对技能和装备执行此逻辑，法则/权能/要素可能使用不同的键名
                    if (type !== 'divinity') {
                      // 如果原数据是字符串，尝试将其转为 { 描述: "..." }
                      if (typeof processed.效果 === 'string') {
                        processed.效果 = { 描述: processed.效果 };
                      } else if (!processed.效果) {
                        processed.效果 = {};
                      }
                    }

                    // 确保其他字段存在
                    if (type === 'equip') {
                      processed.品质 = processed.品质 || '未知';
                      processed.类型 = processed.分类 || processed.类型 || '未知'; // 装备常用"分类"
                      processed.描述 = processed.描述 || '';
                      processed.位置 = processed.位置 || '';
                    } else if (type === 'skill') {
                      processed.品质 = processed.品质 || '未知';
                      processed.类型 = processed.类型 || '未知';
                      processed.消耗 = processed.消耗 ? ensureString(processed.消耗) : '';
                      processed.描述 = processed.描述 || '';
                    }

                    map[名称] = processed;
                  }
                });
              }
              return map;
            };

            // Construct MVU Data
            const mvuData = {
              在场: true, // boolean
              生命层级: data.生命层级 || '第一层级/普通层级',
              等级: parseInt(data.等级) || 1,
              种族: data.种族 || '未知',
              身份: ensureArray(data.身份),
              职业: ensureArray(data.职业),
              性格: ensureString(data.性格).trim(),
              喜爱: ensureString(data.喜爱).trim(),
              外貌: ensureString(data.外貌特质).trim(), // Key changed to '外貌' per schema
              着装: ensureString(data.衣物装饰).trim(), // Key changed to '着装' per schema
              属性: {
                力量: parseAttributeValue(data.属性?.力量),
                敏捷: parseAttributeValue(data.属性?.敏捷),
                体质: parseAttributeValue(data.属性?.体质),
                智力: parseAttributeValue(data.属性?.智力),
                精神: parseAttributeValue(data.属性?.精神),
              },
              技能: arrayToMap(data.技能, 'skill'),
              装备: arrayToMap(data.装备, 'equip'),
              登神长阶: {
                是否开启: !!(data.登神长阶 || (data.生命层级 && data.生命层级.includes('神'))), // Force boolean
                神位: data.登神长阶?.神位 || data.神位 || '',
                神国: {
                  名称: data.登神长阶?.神国?.名称 || data.神国?.名称 || '',
                  描述: data.登神长阶?.神国?.描述 || data.神国?.描述 || '',
                },
                要素: arrayToMap(data.登神长阶?.要素 || data.要素, 'divinity'),
                权能: arrayToMap(data.登神长阶?.权能 || data.权能, 'divinity'),
                法则: arrayToMap(data.登神长阶?.法则 || data.法则, 'divinity'),
              },
              // Default values for MVU specific fields
              命定契约: false, // Key changed to '命定契约' per schema, boolean
              好感度: 0,
              心里话: '',
              背景故事: data.背景故事 || '',
            };

            // Detect variable path prefix
            let prefix = 'stat_data.';
            const targetScope = { type: 'message', message_id: 'latest' };
            let currentVars = null;

            try {
              currentVars = await api.getVariables(targetScope);
              if (currentVars && currentVars.命定系统) {
                prefix = '';
              } else if (currentVars && currentVars.stat_data) {
                prefix = 'stat_data.';
              }
              console.log('Detected variable path prefix:', prefix, 'in scope:', targetScope);
            } catch (e) {
              console.warn('Failed to detect variable path, defaulting to stat_data.', e);
            }

            const keepIfPresent = val => (val === undefined || val === null ? undefined : val);

            const candidates = [];
            if (prefix === 'stat_data.') {
              candidates.push(currentVars?.stat_data?.命定系统?.关系列表?.[charName]);
              candidates.push(currentVars?.stat_data?.[charName]); // fallback: plain key
              candidates.push(currentVars?.stat_data?.ThatNPC); // fallback: literal ThatNPC
            } else {
              candidates.push(currentVars?.命定系统?.关系列表?.[charName]);
            }

            let preservedFavor;
            let preservedHeart;
            for (const entry of candidates) {
              if (!entry) continue;
              if (preservedFavor === undefined) preservedFavor = keepIfPresent(entry?.好感度);
              if (preservedHeart === undefined) preservedHeart = keepIfPresent(entry?.心里话);
            }

            if (preservedFavor !== undefined) mvuData.好感度 = preservedFavor;
            if (preservedHeart !== undefined) mvuData.心里话 = preservedHeart;

            const updatePayload = {};

            if (prefix === 'stat_data.') {
              updatePayload['stat_data'] = {
                命定系统: {
                  关系列表: {
                    [charName]: mvuData,
                  },
                },
              };
            } else {
              updatePayload['命定系统'] = {
                关系列表: {
                  [charName]: mvuData,
                },
              };
            }

            console.log('Attempting to insert MVU data:', updatePayload);

            await api.insertOrAssignVariables(updatePayload, targetScope);

            button.textContent = '✅';
            setTimeout(() => (button.textContent = oldText), 2000);
            console.log('MVU Import Success:', charName, mvuData);
          } catch (err) {
            console.error('MVU Import Error:', err);
            button.textContent = '❌';
            alert('导入失败: ' + err.message);
            setTimeout(() => (button.textContent = '📥'), 2000);
          }
        }

        function initCanvasAnimation(tier, colorHex) {
          const canvas = document.getElementById('particle-canvas');
          const bgLayer = document.querySelector('.card-background-layer');
          if (!canvas || !bgLayer) return;

          const ctx = canvas.getContext('2d');
          let mode = 0;
          const t = parseInt(tier);

          if (t === 3 || t === 4)
            mode = 1; // Arcane Dust
          else if (t === 5)
            mode = 2; // Divine Spores
          else if (t === 6)
            mode = 3; // Legendary Embers
          else if (t >= 7) mode = 4; // Transcendent Orbs

          if (mode === 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            return;
          }

          let particles = [];
          // OPTIMIZATION: Reduced particle count for mobile to save battery/CPU
          // Previous: <600 ? 25 : 40. New: <600 ? 15 : 30.
          const PARTICLE_COUNT = window.innerWidth < 600 ? 15 : 30;
          let r = 255,
            g = 255,
            b = 255;

          const hexColor = (colorHex || '#ffffff').replace(/^#/, '');
          if (hexColor.length === 6) {
            r = parseInt(hexColor.substring(0, 2), 16);
            g = parseInt(hexColor.substring(2, 4), 16);
            b = parseInt(hexColor.substring(4, 6), 16);
          }

          const observer = new ResizeObserver(() => {
            canvas.width = bgLayer.offsetWidth;
            canvas.height = bgLayer.offsetHeight;
          });
          observer.observe(bgLayer);
          canvas.width = bgLayer.offsetWidth;
          canvas.height = bgLayer.offsetHeight;

          // Smart Sleep Mechanism (IntersectionObserver)
          // Only animate when visible in viewport. This is standard browser optimization logic.
          // It stops the "infinite loop" when you scroll away, saving CPU and Battery.
          let isVisible = true;
          const visibilityObserver = new IntersectionObserver(
            entries => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  if (!isVisible) {
                    isVisible = true;
                    animate(); // Restart loop
                  }
                } else {
                  isVisible = false; // Stop loop
                }
              });
            },
            { rootMargin: '50px' },
          ); // Small buffer to ensure smooth entry
          visibilityObserver.observe(bgLayer);

          class Particle {
            constructor() {
              this.reset(true);
            }
            reset(initial = false) {
              this.x = Math.random() * canvas.width;
              this.opacity = Math.random() * 0.4 + 0.1; // Lower opacity for gentler feel

              if (mode === 1) {
                // REBUILT: Soft Arcane Dust
                this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
                this.size = Math.random() * 4 + 2; // Slightly larger to compensate for lack of shadowBlur
                this.speedY = Math.random() * 0.4 + 0.1; // Very slow upward float
                this.sway = Math.random() * 0.2; // Gentle sway
              } else if (mode === 2) {
                this.y = initial ? Math.random() * canvas.height : -10;
                this.size = Math.random() * 5 + 3;
                this.speedY = Math.random() * 1 + 0.5;
                this.sway = Math.random() * 0.5;
              } else if (mode === 3) {
                this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
                this.size = Math.random() * 4 + 2;
                this.speedY = Math.random() * 0.8 + 0.2;
                this.sway = Math.random() * 0.1;
              } else if (mode === 4) {
                this.y = initial ? Math.random() * canvas.height : canvas.height + 20;
                this.size = Math.random() * 8 + 4;
                this.speedY = Math.random() * 1 + 0.5;
                this.sway = Math.random() * 0.2;
              }
            }
            update() {
              if (mode === 2) {
                // Falling
                this.y += this.speedY;
                this.x += Math.sin(this.y * 0.02) * this.sway;
                if (this.y > canvas.height) this.reset(false);
              } else {
                // Rising
                this.y -= this.speedY;
                this.x += Math.sin(this.y * 0.01) * (this.sway || 0.2);
                if (this.y < -50) this.reset(false);
              }
            }
            draw() {
              // OPTIMIZATION: Replaced shadowBlur with RadialGradient
              // shadowBlur is extremely expensive on mobile (CPU bound).
              // RadialGradient is hardware accelerated and looks 95% similar.

              const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);

              if (mode === 4 || mode === 1) {
                // Soft glow for Arcane/Transcendent
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`);
                gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
              } else {
                // Sharper for others, but still soft edge
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`);
                gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
              }

              ctx.fillStyle = gradient;
              ctx.beginPath();
              // Draw a slightly larger circle to contain the gradient fade out
              ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
              ctx.fill();
            }
          }
          for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
          function animate() {
            if (!isVisible) return; // Stop if not visible
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
              p.update();
              p.draw();
            });
            requestAnimationFrame(animate);
          }
          animate();
        }

        const yamlDataSource = document.getElementById('data-source');
        if (yamlDataSource) {
          const yamlData = yamlDataSource.textContent;
          if (yamlData && yamlData.trim() !== '') {
            const result = parseRobust(yamlData);
            if (result.success) {
              renderSheet(result.data, yamlData);
            } else {
              document.body.innerHTML = `
                      <div style="color: #ff6b6b; padding: 20px; text-align: center; background: rgba(0,0,0,0.8); border-radius: 8px; margin: 20px;">
                        <h3 style="margin-top:0;">⚠️ YAML 解析失败</h3>
                        <p style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 10px;">LLM 生成的数据格式似乎有误。</p>
                        <div style="background: rgba(0,0,0,0.5); padding: 10px; border-radius: 4px; text-align: left; font-family: monospace; font-size: 0.85rem; overflow-x: auto; border: 1px solid #d63031;">
                          ${result.error}
                        </div>
                        <p style="font-size: 0.8rem; color: #aaa; margin-top: 10px;">建议检查：缩进是否对齐、是否包含非法字符。</p>
                      </div>`;
            }
          }
        }
});

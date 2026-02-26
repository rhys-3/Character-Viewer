document.addEventListener('DOMContentLoaded', () => {
         const raceColorMap = {
                /* --- [具体种族名] --- */
                /* --- 深渊异神与超自然 (质变) --- */
                '异神': '#C2D67A', /* 异荧绿 */
                '魔王': '#C876E7', '深淵': '#C876E7', '深渊': '#C876E7', /* 魔晶紫 */
                '不死': '#B0C4DE', '亡': '#B0C4DE', /* 钢蓝 */
                '魅魔': '#E64DE6', '淫魔': '#E64DE6', '小惡魔': '#E64DE6', '小恶魔': '#E64DE6', /* 魔能粉 */
                '炎魔': '#EBD284', /* 熔火金 */
                '惡魔': '#D9739A', '恶魔': '#D9739A', '魔鬼': '#D9739A', /* 炼狱红 */

                /* --- 奇特精魂与构装体 (特殊概念) --- */
                '詩靈': '#D1C4E9', '诗灵': '#D1C4E9', /* 丁香紫 */
                '器靈': '#C0C0C0', '器灵': '#C0C0C0', '物魂': '#C0C0C0', '鑄魂': '#C0C0C0', '铸魂': '#C0C0C0', /* 銀灰 */
                '願靈': '#FFEEAA', '愿灵': '#FFEEAA', '聖靈': '#FFEEAA', '圣灵': '#FFEEAA', '英靈': '#FFEEAA', '英灵': '#FFEEAA', '從者': '#FFEEAA', '从者': '#FFEEAA', /* 圣金 */
                '構裝': '#B0BEC5', '构装': '#B0BEC5', '人造生物': '#B0BEC5', '人造': '#B0BEC5', /* 钢板灰 */
                '不定形': '#98FB98', '史萊姆': '#98FB98', '史莱姆': '#98FB98', /* 凝胶绿 */
                '異域': '#C876E7', '异域': '#C876E7', '異界': '#C876E7', '异界': '#C876E7', /* 魔晶紫 */

                /* --- 生物与魔物 (通用概念) --- */
                '元素': '#8DFAFA', /* 魔力青 */
                '魔物': '#E64DE6', /* 魔能粉 */
                '植物': '#C5E1A5', /* 嫩绿 */

                /* --- 精灵族亚种 --- */
                '始源精靈': '#C0F0C0', '始源精灵': '#C0F0C0', /* 薄荷奶绿 */
                '暗夜精靈': '#9575CD', '暗夜精灵': '#9575CD', /* 暗影紫 */
                '眷蕊精靈': '#FFAB91', '眷蕊精灵': '#FFAB91', '纏心精靈': '#FFAB91', '缠心精灵': '#FFAB91', /* 珊瑚蜜桃 */
                '雪精靈': '#E0FFFF', '雪精灵': '#E0FFFF', /* 冰晶青 */
                '太陽精靈': '#E6C64D', '太阳精灵': '#E6C64D', /* 鎏金 */
                '精靈': '#98D98E', '精灵': '#98D98E', /* 叶绿 */
                '木靈': '#C5E1A5', '木灵': '#C5E1A5', /* 嫩绿 */
                '獠族': '#BA68C8', /* 兰紫 */

                /* --- 龙族亚种 --- */
                '天舞龍': '#E1BEE7', '天舞龙': '#E1BEE7', /* 珍珠紫 */
                '魔紋龍': '#D1C4E9', '魔纹龙': '#D1C4E9', /* 丁香紫 */
                '亞龍': '#E6924D', '亚龙': '#E6924D', /* 赭石 */
                '北境龍裔': '#B0C4DE', '北境龙裔': '#B0C4DE', /* 鋼藍 */
                '東方後裔': '#BEEBBE', '东方后裔': '#BEEBBE', /* 玉青 */

                /* --- 妖精与自然之子 --- */
                '花靈': '#FFAB91', '花灵': '#FFAB91', '花精': '#FFAB91', '花妖': '#FFAB91', '花仙': '#FFAB91', /* 珊瑚蜜桃 */
                '汐海妖精': '#7FFFD4', /* 淺灣碧 */
                '妖精': '#F8BBD0', /* 蔷薇粉 */
                '艾琳': '#F48FB1', /* 草莓粉 */

                /* --- 巨人类与亚种 (Giants & Subspecies) --- */
                '泰坦': '#EBD284', /* 熔火金 */
                '霜巨人': '#E0FFFF', /* 冰晶青 */
                '巨人': '#E6924D', /* 赭石 */
                '山妖': '#D19A66', /* 铜棕 */
                '雪怪': '#D1D1FB', /* 月光紫 */
                '食人魔': '#A3D76B', '巨魔': '#A3D76B', /* 邪能绿 */

                /* --- 兽身人亚种 (Humanoid Hybrids) --- */
                '人馬': '#B88461', '人马': '#B88461', /* 草原棕 */
                '蛇女': '#78C297', /* 翡翠绿 */
                '蠑螈': '#F8BBD0', '蝾螈': '#F8BBD0', '黑角': '#F8BBD0', /* 蔷薇粉 */
                '塞壬': '#7FFFD4', /* 浅湾碧 */
                
                /* --- 智慧种族 --- */
                '墮翼': '#D1D1FB', '堕翼': '#D1D1FB', '墮羽': '#D1D1FB', '堕羽': '#D1D1FB', '女妖': '#D1D1FB', /* 月光紫 */
                '半身人': '#E6B26A', /* 麦黄 */
                '矮人': '#D19A66', /* 铜棕 */
                '地精': '#9CCC65', '侏儒': '#9CCC65', /* 苔绿 */

                /* --- [通用种族名] --- */
                '神': '#FFF8DC', '天': '#FFF8DC', /* 圣光白 */
                '龍': '#EBD284', '龙': '#EBD284', /* 熔火金 */
                '血': '#E65A5A', '寄': '#E65A5A', '植': '#E65A5A', /* 猩红血 */
                '魔': '#B0C4DE', '靈': '#B0C4DE', '灵': '#B0C4DE', /* 钢蓝 */
                '星': '#D1C4E9', '幻': '#D1C4E9', /* 丁香紫 */
                '魚': '#7FFFD4', '鱼': '#7FFFD4', /* 浅湾碧 */
                '翼': '#87CEFA', '鳥': '#87CEFA', '鸟': '#87CEFA', '羽': '#87CEFA', /* 蔚蓝 */
                '獸': '#E6924D', '兽': '#E6924D', /* 赭石 */
                '鼠': '#A3D76B', /* 邪能绿 */
                '機': '#B0BEC5', '机': '#B0BEC5', '裝': '#B0BEC5', '装': '#B0BEC5', '器': '#B0BEC5', '物': '#B0BEC5', '像': '#B0BEC5', /* 钢板灰 */
                '妖': '#E64DE6', '怪': '#E64DE6', /* 魔能粉 */
                '人': '#DEB887', '娘': '#DEB887', /* 柔沙 */

                /* --- [最终万用键] 当所有匹配失败时 --- */
                '其它': '#C0C0C0'                /* 银灰 */
            };
          const raceAnimationMap = {
                /* --- [具體種族名] 依據 raceColorMap 相同順序 --- */
                '異神': 'bg-anim-void-gaze', '异神': 'bg-anim-void-gaze', '魔王': 'bg-anim-void-gaze', '深淵': 'bg-anim-void-gaze', '深渊': 'bg-anim-void-gaze',
                '亡靈龍': 'bg-anim-dragonscale-dominion', '亡灵龙': 'bg-anim-dragonscale-dominion',
                '不死': 'bg-anim-spectral-drift', '亡': 'bg-anim-spectral-drift',
                '魅魔': 'bg-anim-dreamy-radiance', '淫魔': 'bg-anim-dreamy-radiance', '小惡魔': 'bg-anim-dreamy-radiance', '小恶魔': 'bg-anim-dreamy-radiance',
                '炎魔': 'bg-anim-primordial-essence', '惡魔': 'bg-anim-primordial-essence', '恶魔': 'bg-anim-primordial-essence',
                '魔鬼': 'bg-anim-crimson-authority',
                '詩靈': 'bg-anim-dreamy-radiance', '诗灵': 'bg-anim-dreamy-radiance',
                '器靈': 'bg-anim-radiant-heart', '器灵': 'bg-anim-radiant-heart', '物魂': 'bg-anim-radiant-heart', '鑄魂': 'bg-anim-radiant-heart', '铸魂': 'bg-anim-radiant-heart', '願靈': 'bg-anim-radiant-heart', '愿灵': 'bg-anim-radiant-heart', '聖靈': 'bg-anim-radiant-heart', '圣灵': 'bg-anim-radiant-heart',
                '英靈': 'bg-anim-crystalline-lattice', '英灵': 'bg-anim-crystalline-lattice', '從者': 'bg-anim-crystalline-lattice', '从者': 'bg-anim-crystalline-lattice',
                '構裝': 'bg-anim-machina-core', '构装': 'bg-anim-machina-core',
                '人造': 'bg-anim-chimeric-flow', '不定形': 'bg-anim-chimeric-flow', '史萊姆': 'bg-anim-chimeric-flow', '史莱姆': 'bg-anim-chimeric-flow', '異域': 'bg-anim-chimeric-flow', '异域': 'bg-anim-chimeric-flow', '異界': 'bg-anim-chimeric-flow', '异界': 'bg-anim-chimeric-flow',
                '元素': 'bg-anim-primordial-essence', '魔物': 'bg-anim-primordial-essence',
                '植物': 'bg-anim-sylvan-breeze', '精靈': 'bg-anim-sylvan-breeze', '精灵': 'bg-anim-sylvan-breeze', '木靈': 'bg-anim-sylvan-breeze', '木灵': 'bg-anim-sylvan-breeze',
                '獠族': 'bg-anim-void-gaze',
                '東方後裔': 'bg-anim-celestial-grace', '东方后裔': 'bg-anim-celestial-grace',
                '花靈': 'bg-anim-dreamy-radiance', '花灵': 'bg-anim-dreamy-radiance', '花精': 'bg-anim-dreamy-radiance', '花妖': 'bg-anim-dreamy-radiance', '花仙': 'bg-anim-dreamy-radiance', '妖精': 'bg-anim-dreamy-radiance',
                '艾琳': 'bg-anim-fluffy-frenzy',
                '泰坦': 'bg-anim-celestial-grace',
                '霜巨人': 'bg-anim-crystalline-lattice',
                '巨人': 'bg-anim-primordial-essence', '山妖': 'bg-anim-primordial-essence',
                '雪怪': 'bg-anim-spectral-drift',
                '食人魔': 'bg-anim-chimeric-flow', '巨魔': 'bg-anim-chimeric-flow',
                '人馬': 'bg-anim-fluffy-frenzy', '人马': 'bg-anim-fluffy-frenzy', '蛇女': 'bg-anim-fluffy-frenzy', '蠑螈': 'bg-anim-fluffy-frenzy', '蝾螈': 'bg-anim-fluffy-frenzy',
                '黑角': 'bg-anim-void-gaze',
                '塞壬': 'bg-anim-oceanic-breath',
                '墮翼': 'bg-anim-celestial-grace', '堕翼': 'bg-anim-celestial-grace', '墮羽': 'bg-anim-celestial-grace', '堕羽': 'bg-anim-celestial-grace', '女妖': 'bg-anim-celestial-grace',
                '半身人': 'bg-anim-radiant-heart',
                '矮人': 'bg-anim-crystalline-lattice',
                '地精': 'bg-anim-machina-core', '侏儒': 'bg-anim-machina-core',

                /* --- [通用種族名] --- */
                '神': 'bg-anim-celestial-grace', '天': 'bg-anim-celestial-grace', '天使': 'bg-anim-celestial-grace',
                '龍': 'bg-anim-dragonscale-dominion', '龙': 'bg-anim-dragonscale-dominion',
                '血': 'bg-anim-crimson-authority', '寄': 'bg-anim-crimson-authority', '植': 'bg-anim-crimson-authority',
                '魔': 'bg-anim-spectral-drift', '靈': 'bg-anim-spectral-drift', '灵': 'bg-anim-spectral-drift',
                '星': 'bg-anim-dreamy-radiance', '幻': 'bg-anim-dreamy-radiance',
                '魚': 'bg-anim-oceanic-breath', '鱼': 'bg-anim-oceanic-breath',
                '翼': 'bg-anim-celestial-grace', '鳥': 'bg-anim-celestial-grace', '鸟': 'bg-anim-celestial-grace', '羽': 'bg-anim-celestial-grace',
                '獸': 'bg-anim-fluffy-frenzy', '兽': 'bg-anim-fluffy-frenzy',
                '鼠': 'bg-anim-void-gaze',
                '機': 'bg-anim-machina-core', '机': 'bg-anim-machina-core', '裝': 'bg-anim-machina-core', '装': 'bg-anim-machina-core', '器': 'bg-anim-machina-core', '物': 'bg-anim-machina-core', '像': 'bg-anim-machina-core',
                '妖': 'bg-anim-primordial-essence', '怪': 'bg-anim-primordial-essence',
                '人': 'bg-anim-radiant-heart', '娘': 'bg-anim-radiant-heart',

                /* --- [最終萬用鍵] 當所有匹配失敗時 --- */
                '其它': 'bg-anim-chimeric-flow'
            };

            const allAnimationClasses = [...new Set(Object.values(raceAnimationMap))];

           function hexToRgb(hex) { if (!hex || typeof hex !== 'string') return '128, 128, 128'; hex = hex.replace(/^#/, ''); if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]; const r = parseInt(hex.substring(0, 2), 16); const g = parseInt(hex.substring(2, 4), 16); const b = parseInt(hex.substring(4, 6), 16); return `${r}, ${g}, ${b}`; }
            function getSmartArray(input) { if (input === undefined || input === null) return []; if (Array.isArray(input)) return input; const str = String(input).trim(); if (!str || str.toLowerCase() === 'null' || str.toLowerCase() === 'none') return []; let processed = str.replace(/\]\s*\[/g, '], ['); processed = processed.replace(/^[\s\["']+|[\s\]"']+$/g, ''); const items = processed.split(/[,;|，；、]/); return items.map(s => s.trim().replace(/^['"\[\(]+|['"\]\)]+$/g, '')).filter(s => s && s !== 'null'); }
            function cleanYaml(yamlStr){if(!yamlStr)return'';yamlStr=yamlStr.replace(/\u00A0/g,' ').replace(/\t/g,'  ').replace(/：/g,': ').replace(/，/g,',').replace(/；/g,';').replace(/】/g,']').replace(/【/g,'[');const lines=yamlStr.split('\n');const sensitiveKeys=['身份','职业','性格','喜爱','外貌特质','衣物装饰','背景故事','描述','效果','标签','消耗','类型','品质','神位','名称','姓名','种族','等级','生命层级', '職業', '喜愛', '外貌特質', '衣物裝飾', '等級', '生命層級', '品質', '類型', '標籤', '名稱', '種族', '裝備', '分類', '權能', '法則', '被動效果', '主動效果'];const attrKeys=['力量','敏捷','体质','智力','精神', '體質'];const cleanedLines=lines.map(line=>{const match=line.match(/^(\s*)([-\w\u4e00-\u9fa5]+)\s*:\s*(.+)$/);if(!match)return line;const indent=match[1];const key=match[2];let val=match[3].trim();if(val.startsWith('|')||val.startsWith('>'))return line;if(attrKeys.some(k=>key.includes(k))){if((/[+=]/.test(val)||val.includes('{'))&&!/^["'].*["']$/.test(val)){val=val.replace(/"/g,'\\"');return`${indent}${key}: \"${val}\"`;}}const isSensitive=sensitiveKeys.some(k=>key.includes(k));const hasDangerousChars=/[\{\}\[\]]/.test(val);const hasQuoteInside=val.includes('\"');const isFullyQuoted=/^["'].*["']$/.test(val);if((isSensitive||hasDangerousChars||hasQuoteInside)&&!isFullyQuoted){val=val.replace(/"/g,'\\"');return`${indent}${key}: \"${val}\"`;}return line;});return cleanedLines.join('\n');}
            function parseRobust(yamlStr) { try { return jsyaml.load(cleanYaml(yamlStr)); } catch (e) { console.error('YAML Parsing failed:', e, 'Cleaned YAML:', cleanYaml(yamlStr)); return null; } }
            function hasText(val) { if (val === null || val === undefined) return false; const s = String(val).trim().toLowerCase(); return s !== '' && s !== 'null' && s !== 'none' && s !== '[]' && s !== '无' && s !== '無'; }
            function hasArrayContent(arr) { if (!arr || !Array.isArray(arr)) return false; return arr.length > 0 && arr.some(item => hasText(item)); }

            function renderSheet(data, originalYaml) {
                const wrapper = document.querySelector('.card-wrapper');
                if (!wrapper || !data) return;
                
                const tierMap = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '壹': 1, '貳': 2, '叁': 3, '肆': 4, '伍': 5, '陸': 6, '柒': 7 };
                const tierDataSource = data.生命层级 || data.生命層級 || '';
                const tierStr = tierDataSource.toString().match(/[第](.)[层層]级/);
                const tier = tierStr ? (tierMap[tierStr[1]] || parseInt(tierStr[1])) : (parseInt(tierDataSource) || 1);
                wrapper.dataset.tier = tier;

                const race = data.种族 || data.種族 || '其它';
                let raceKey = '其它';
                const orderedRaceKeys = Object.keys(raceColorMap); 
                for (const k of orderedRaceKeys) { if (race.includes(k)) { raceKey = k; break; } }
                const raceColor = raceColorMap[raceKey] || raceColorMap['其它'];
                const raceColorRgb = hexToRgb(raceColor);
                wrapper.style.setProperty('--primary-theme-color', raceColor);
                wrapper.style.setProperty('--primary-theme-color-rgb', raceColorRgb);
                
                allAnimationClasses.forEach(cls => wrapper.classList.remove(cls));
                let animationKey = raceKey;
                if (!raceAnimationMap.hasOwnProperty(animationKey)) { for (const k of Object.keys(raceAnimationMap)) { if (race.includes(k)) { animationKey = k; break; } } }
                const animationClass = raceAnimationMap[animationKey] || raceAnimationMap['其它'];
                
                const frameLayer = document.getElementById('frame-layer');
                let frameHTML = '';
                let wrapperClassList = ['card-wrapper', animationClass];

                if (tier >= 7) {
                    wrapperClassList.push('deluxe-tier');
                    const baseHighTierPath = `M 10,1190 L 10,100 L 100,10 L 700,10 L 790,100 L 790,1190 Z`;
                    const highTierDetails = `<path d="M 25,1175 L 25,105 L 105,25 L 695,25 L 775,105 L 775,1175" stroke-width="1" opacity="0.6" /><polyline points="100,15 150,15 130,45" /><polyline points="700,15 650,15 670,45" />`;
                    const sovereignCrown = `
                        <path d="M 380,5 L 400,25 L 420,5 Z M 390,25 L 370,15 M 410,25 L 430,15" stroke-width="3" />
                        <path d="M 10,1160 L 50,1190 L 80,1190" stroke-width="2.5" />
                        <path d="M 790,1160 L 750,1190 L 720,1190" stroke-width="2.5" />
                    `;
                    frameHTML = `<svg class="frame-svg" viewBox="0 0 800 1200" preserveAspectRatio="none"><path class="frame-deluxe-halo" d="${baseHighTierPath}" /><path d="${baseHighTierPath}" />${highTierDetails}${sovereignCrown}</svg>`;
                } else if (tier >= 5) {
                    wrapperClassList.push('high-tier');
                    frameHTML = `<svg class="frame-svg" viewBox="0 0 800 1200" preserveAspectRatio="none"><path d="M 10,1190 L 10,100 L 100,10 L 700,10 L 790,100 L 790,1190 Z" /><path d="M 25,1175 L 25,105 L 105,25 L 695,25 L 775,105 L 775,1175" stroke-width="1" opacity="0.6" /><polyline points="100,15 150,15 130,45" /><polyline points="700,15 650,15 670,45" /></svg>`;
                } else if (tier >= 3) {
                    wrapperClassList.push('intermediate-tier');
                    frameHTML = `<svg class="frame-svg" viewBox="0 0 800 1200" preserveAspectRatio="none"><path d="M 25,150 L 25,25 L 150,25" /><path d="M 775,150 L 775,25 L 650,25" /><path d="M 25,1050 L 25,1175 L 150,1175" /><path d="M 775,1050 L 775,1175 L 650,1175" /><path d="M 395,15 L 405,15" opacity="0.8"/><path d="M 395,1185 L 405,1185" opacity="0.8"/></svg>`;
                }

                wrapper.className = wrapperClassList.join(' ');
                frameLayer.innerHTML = frameHTML;
                frameLayer.style.display = (tier >= 3) ? 'block' : 'none';
                
                addLorebookButton(data, originalYaml);
                document.querySelector('[data-name]').textContent = data.姓名 || data.名稱 || 'Unknown';
                document.querySelector('[data-level]').textContent = `Lv. ${data.等级 || data.等級 || '?'}`;
                document.querySelector('[data-tier-name]').textContent = data.生命层级 || data.生命層級 || 'T?';
                
                const formatList = (val) => getSmartArray(val).join(' / ') || 'N/A';
                document.querySelector('[data-core-info]').innerHTML = `<div class="info-item" data-race-item><span class="info-label">种族</span><span class="info-value">${race}</span></div><div class="info-item"><span class="info-label">身份</span><span class="info-value" style="font-size:1rem">${formatList(data.身份)}</span></div><div class="info-item"><span class="info-label">职业</span><span class="info-value" style="font-size:1rem">${formatList(data.职业 || data.職業)}</span></div><div class="info-item core-info-placeholder"><span class="info-value" style="font-size: 1.4rem;">⬦ ⚜ ⬦</span></div>`;
                const res = data.资源 || data.資源 || data.属性 || data.屬性 || {};
                document.querySelector('[data-vitals]').innerHTML = `<div class="vital-item hp"><span class="vital-label">HP</span><span class="vital-value">${(res.HP || 0).toLocaleString()}</span></div><div class="vital-item mp"><span class="vital-label">MP</span><span class="vital-value">${(res.MP || 0).toLocaleString()}</span></div><div class="vital-item sp"><span class="vital-label">SP</span><span class="vital-value">${(res.SP || 0).toLocaleString()}</span></div>`;
                
                const attributesContainer = document.querySelector('[data-attributes]'); 
                attributesContainer.innerHTML = '';
                let attributeCount = 0; 
                const attributeKeys = ['力量', '敏捷', '体质', '智力', '精神'];
                const attributeKeyMap = { '体质': '體質' };
                const attrObj = data.属性 || data.屬性;
                if (attrObj) {
                    attributeKeys.forEach(key => {
                        const tcKey = attributeKeyMap[key] || key;
                        const value = attrObj[key] ?? attrObj[tcKey];

                        if (value === undefined) return;
                        attributeCount++;
                        const rawValue = String(value); let total = rawValue; let details = '';
                        if (rawValue.includes('=')) { const parts = rawValue.split('='); total = parts[parts.length - 1].trim(); details = parts[0].trim(); }
                        const item = document.createElement('div'); 
                        item.className = 'attribute-item';
                        const hasDetails = details && details.trim() !== '';
                        item.innerHTML = `<div class="attribute-box"><span class="attribute-name">${key}</span><div class="attribute-value-container"><span class="attribute-total">${total}</span>${hasDetails ? `<span class="attribute-details">${details}</span>` : ''}</div></div>`;
                        if (hasDetails) { item.classList.add('is-collapsible'); item.onclick = () => { item.classList.toggle('show-formula'); item.classList.add('is-releasing-glow'); item.addEventListener('animationend', () => item.classList.remove('is-releasing-glow'), { once: true }); }; }
                        attributesContainer.appendChild(item);
                    });
                }
                const currentColumns = window.innerWidth > 767 ? 2 : (window.innerWidth <= 480 ? 2 : 3);
                if (attributeCount > 0 && (attributeCount % currentColumns !== 0)) { const placeholder = document.createElement('div'); placeholder.className = 'attribute-item placeholder-item'; placeholder.innerHTML = `<div class="attribute-box"><span class="attribute-total">⚜</span></div>`; attributesContainer.appendChild(placeholder); }
                
                document.querySelector('#tab-profile').innerHTML = '';
                const profileData = {'性格': data.性格, '喜爱': data.喜爱 || data.喜愛, '外貌特质': data.外貌特质 || data.外貌特質, '衣物装饰': data.衣物装饰 || data.衣物裝飾};
                for (const [label, content] of Object.entries(profileData)) {
                    const formattedContent = getSmartArray(content).join(', ');
                    if (hasText(formattedContent)) { document.querySelector('#tab-profile').innerHTML += `<h3 class="subsection-title">${label}</h3><div class="profile-text-block">${formattedContent}</div>`; }
                }

                renderCards('#tab-skills', data.技能, createSkillCard);
                
                const divinityContainer = document.querySelector('#tab-divinity'); divinityContainer.innerHTML = '';
                const divData = data.登神长阶 || data.登神長階 || {};
                const rawDeity = hasText(divData.神位) ? divData.神位 : (hasText(data.神位) ? data.神位 : null);
                const rawKingdom = divData.神国 || divData.神國 || data.神国 || data.神國;
                const rawElements = hasArrayContent(divData.要素) ? divData.要素 : (hasArrayContent(data.要素) ? data.要素 : []);
                const rawPowers = hasArrayContent(divData.权能 || divData.權能) ? (divData.权能 || divData.權能) : (hasArrayContent(data.权能 || data.權能) ? (data.权能 || data.權能) : []);
                const rawLaws = hasArrayContent(divData.法则 || divData.法則) ? (divData.法则 || divData.法則) : (hasArrayContent(data.法则 || data.法則) ? (data.法则 || data.法則) : []);
                if (rawDeity) divinityContainer.innerHTML += `<div class="godhood-display">神位：${rawDeity}</div>`;
                if (rawKingdom && hasText(rawKingdom.名称 || rawKingdom.名稱)) { divinityContainer.innerHTML += `<div class="card divine-kingdom-card"><div class="card-header"><h3 class="card-title">${rawKingdom.名称 || rawKingdom.名稱}</h3></div><div class="card-body"><p>${rawKingdom.描述 || '无可名状之地。'}</p></div></div>`; }
                if (rawElements.length > 0) { divinityContainer.innerHTML += `<div class="subsection-title">要素</div>`; renderCards('#tab-divinity', rawElements, createGenericCard); }
                if (rawPowers.length > 0) { divinityContainer.innerHTML += `<div class="subsection-title">权能</div>`; renderCards('#tab-divinity', rawPowers, createGenericCard); }
                if (rawLaws.length > 0) { divinityContainer.innerHTML += `<div class="subsection-title">法则</div>`; renderCards('#tab-divinity', rawLaws, createLawCard); }
                
                renderCards('#tab-equipment', data.装备 || data.裝備, createEquipmentCard);
                
                const inventoryContainer = document.querySelector('#tab-inventory'); inventoryContainer.innerHTML = '';
                if(hasArrayContent(data.道具)) { inventoryContainer.innerHTML += `<div class="subsection-title">道具</div>`; renderCards('#tab-inventory', data.道具, createEquipmentCard); }
                if(hasArrayContent(data.特殊物品)) { inventoryContainer.innerHTML += `<div class="subsection-title">特殊物品</div>`; renderCards('#tab-inventory', data.特殊物品, createEquipmentCard); }
                
                document.querySelector('#tab-backstory').innerHTML = hasText(data.背景故事) ? `<p class="story">${data.背景故事}</p>` : '';

                initializeTabsAndInteractivity(data);
            }
            
            function initializeTabsAndInteractivity(data) {
                const tabButtons = document.querySelectorAll('.tab-button'); const tabContents = document.querySelectorAll('.tab-content'); let firstVisibleTab = null;
                const divData = data.登神长阶 || data.登神長階 || {};
                const kingdom = divData.神国 || divData.神國 || data.神国 || data.神國;
                const hasDivinity = hasText(divData.神位) || hasText(data.神位) || (kingdom && hasText(kingdom.名称 || kingdom.名稱)) || hasArrayContent(divData.要素) || hasArrayContent(data.要素) || hasArrayContent(divData.权能 || divData.權能) || hasArrayContent(data.权能 || data.權能) || hasArrayContent(divData.法则 || divData.法則) || hasArrayContent(data.法则 || data.法則);

                tabButtons.forEach(button => {
                    const targetId = button.dataset.tabTarget;
                    const contentElement = document.querySelector(targetId);
                    let hasContent = false;
                    switch (targetId) { 
                        case '#tab-profile': hasContent = hasText(data.性格) || hasText(data.喜爱 || data.喜愛) || hasText(data.外貌特质 || data.外貌特質) || hasText(data.衣物装饰 || data.衣物裝飾); break;
                        case '#tab-skills': hasContent = hasArrayContent(data.技能); break; 
                        case '#tab-divinity': hasContent = hasDivinity; break; 
                        case '#tab-equipment': hasContent = hasArrayContent(data.装备 || data.裝備); break; 
                        case '#tab-inventory': hasContent = hasArrayContent(data.道具) || hasArrayContent(data.特殊物品); break;
                        case '#tab-backstory': hasContent = hasText(data.背景故事); break; 
                    }
                    if (!hasContent) { button.style.display = 'none'; if(contentElement) contentElement.innerHTML=''; } else { button.style.display = ''; if (!firstVisibleTab) firstVisibleTab = button; }
                    
                    button.addEventListener('click', () => { 
                        if (button.style.display === 'none') return;
                        tabButtons.forEach(btn => btn.classList.remove('active')); 
                        tabContents.forEach(content => { content.classList.remove('active'); content.style.display = 'none'; });
                        button.classList.add('active'); 
                        const newActiveContent = document.querySelector(button.dataset.tabTarget);
                        if(newActiveContent) { newActiveContent.classList.add('active'); newActiveContent.style.display = ''; }
                        button.classList.add('is-releasing-glow'); 
                        button.addEventListener('animationend', () => { button.classList.remove('is-releasing-glow'); }, { once: true });
                    });
                });
                
                if (firstVisibleTab) { firstVisibleTab.click(); }
                
                const charName = document.querySelector('.char-name'); if (charName) { charName.addEventListener('click', () => { charName.classList.add('is-releasing'); charName.addEventListener('animationend', () => charName.classList.remove('is-releasing'), { once: true }); }); } 
                const vitalItems = document.querySelectorAll('.vital-item'); vitalItems.forEach(item => { const activate = () => item.classList.add('is-active'); const deactivate = () => item.classList.remove('is-active'); item.addEventListener('mouseover', activate); item.addEventListener('mousedown', activate); item.addEventListener('mouseout', deactivate); item.addEventListener('mouseup', deactivate); });
            }

            function renderCards(containerSelector, items, cardCreator) { 
                const container = document.querySelector(containerSelector);
                if (!container || !items || !Array.isArray(items) || items.length === 0) return;
                items.forEach(item => { if(item && hasText(item.名称 || item.名稱)) { container.insertAdjacentHTML('beforeend', cardCreator(item)) }}); 
            }
            function createTags(tags) { const safeTags = getSmartArray(tags); return safeTags.length > 0 ? safeTags.map(tag => `<span class="card-tag">${tag}</span>`).join('') : ''; }
            function createSkillCard(item) { const costStr = getSmartArray(item.消耗).join(' / '); const effect = (item.效果 || '无').replace(/\n/g, '<br>'); return `<div class="card"><div class="card-header"><h3 class="card-title">${item.名称 || item.名稱 || ''}</h3><span class="card-subtitle">${(item.品质 || item.品質) || ''} / ${(item.类型 || item.類型) || ''}</span></div><div class="card-body"><div class="card-tags">${createTags(item.标签 || item.標籤)}</div><p><span class="card-label">消耗:</span> ${costStr || '无'}</p><p><span class="card-label">效果:</span> ${effect}</p><p><span class="card-label">描述:</span> ${item.描述 || '无'}</p></div></div>`; }
            function createEquipmentCard(item) { const effect = (item.效果 || '无').replace(/\n/g, '<br>'); return `<div class="card"><div class="card-header"><h3 class="card-title">${item.名称 || item.名稱 || ''}</h3><span class="card-subtitle">${(item.品质 || item.品質) || ''} / ${item.分类 || item.分類 || item.类型 || item.類型 || ''}</span></div><div class="card-body"><div class="card-tags">${createTags(item.标签 || item.標籤)}</div><p><span class="card-label">效果:</span> ${effect}</p><p><span class="card-label">描述:</span> ${item.描述 || '无'}</p></div></div>`; }
            function createLawCard(item) { const passive = (item.被动效果 || item.被動效果 || '无').replace(/\n/g, '<br>'); const active = (item.主动效果 || item.主動效果 || '无').replace(/\n/g, '<br>'); return `<div class="card"><div class="card-header"><h3 class="card-title">${item.名称 || item.名稱 || ''}</h3></div><div class="card-body"><p>${item.描述 || ''}</p><p><span class="card-label">被动效果:</span> ${passive}</p><p><span class="card-label">主动效果:</span> ${active}</p></div></div>`; }
            function createGenericCard(item) { const content = (item.效果 || item.描述 || '无').replace(/\n/g, '<br>'); return `<div class="card"><div class="card-header"><h3 class="card-title">${item.名称 || item.名稱 || ''}</h3></div><div class="card-body"><p>${content}</p></div></div>`; }
            
            function addLorebookButton(data, originalYaml) {
                const header = document.querySelector('.sheet-header'); if (!header) return;
                let button = document.getElementById('save-to-lorebook-btn'); if (button) button.remove();
                button = document.createElement('button'); button.id = 'save-to-lorebook-btn'; button.innerHTML = '💾 <span class="btn-text">保存到世界书</span>';
                button.addEventListener('click', async (e) => {
                    e.stopPropagation(); const api = window.TavernHelper || window;
                    if (typeof api.getOrCreateChatWorldbook !== 'function' || typeof api.createWorldbookEntries !== 'function') { alert('错误：未检测到 Worldbook API (TavernHelper)。'); return; }
                    try {
                        button.innerHTML = '⏳ <span class="btn-text">处理中...</span>';
                        const characterName = data.姓名 || 'Unknown'; let shortName = characterName.split(/[·\s]/)[0]; const lorebookKey = shortName && shortName.trim().length > 0 ? shortName : characterName;
                        let bookName = (api.getChatWorldbookName) ? await api.getChatWorldbookName('current') : null;
                        if (!bookName) { const now = new Date(); const timeStr = `${now.getFullYear()}_${(now.getMonth() + 1).toString().padStart(2, '0')}_${now.getDate().toString().padStart(2, '0')}`; const desiredName = `命定之诗-Characters_${timeStr}`; bookName = await api.getOrCreateChatWorldbook('current', desiredName); }
                        const newEntry = { name: characterName, enabled: true, strategy: { type: 'selective', keys: [lorebookKey] }, position: { type: 'after_character_definition', order: 601 }, content: originalYaml, };
                        await api.createWorldbookEntries(bookName, [newEntry]);
                        button.innerHTML = '✅ <span class="btn-text">已保存!</span>'; button.disabled = true;
                        setTimeout(() => { button.innerHTML = '💾 <span class="btn-text">保存到世界书</span>'; button.disabled = false; }, 1500);
                    } catch (err) { console.error('Worldbook Save Error:', err); button.innerHTML = '❌ <span class="btn-text">失败</span>'; alert('保存失败: ' + err.message); setTimeout(() => (button.innerHTML = '💾 <span class="btn-text">保存到世界书</span>'), 2000); }
                });
                header.appendChild(button);
            }
            
            const yamlDataSource = document.getElementById('data-source');
            if (yamlDataSource) {
                const rawYaml = yamlDataSource.textContent;
                if (rawYaml && rawYaml.trim()) {
                    const data = parseRobust(rawYaml);
                    if (data) { renderSheet(data, rawYaml); } 
                    else { document.body.innerHTML = `<div style="color: #ff6b6b; padding: 20px; font-family: sans-serif; text-align: center; background: rgba(0,0,0,0.8); border-radius: 10px;"><h3>解析错误 (Parsing Error)</h3><p>数据格式似乎有误，请检查YAML。</p></div>`; }
                }
            }
        });



import { workspace, window } from 'vscode';

// TODO 临时仅支持这部分语言
const language: [string, string][] = [
    ['zh', '中文'],
    ['en', '英语'],
    ['yue', '粤语'],
    ['wyw', '文言文'],
    ['jp', '日语'],
    ['kor', '韩语'],
    ['fra', '法语'],
    ['spa', '西班牙语'],
    ['th', '泰语'],
    ['ara', '阿拉伯语'],
    ['ru', '俄语'],
    ['pt', '葡萄牙语'],
    ['de', '德语'],
    ['it', '意大利语'],
    ['el', '希腊语'],
    ['nl', '荷兰语'],
    ['pl', '波兰语'],
    ['bul', '保加利亚语'],
    ['est', '爱沙尼亚语'],
    ['dan', '丹麦语'],
    ['fin', '芬兰语'],
    ['cs', '捷克语'],
    ['rom', '罗马尼亚语'],
    ['slo', '斯洛文尼亚语'],
    ['swe', '瑞典语'],
    ['hu', '匈牙利语'],
    ['cht', '繁体中文'],
    ['vie', '越南语']
];

export async function changeTargetLanguage() {
    let configuration = workspace.getConfiguration('commentTranslateBaidu');
    let res: string = await window.showQuickPick(language.map(item => item[1]), {
        placeHolder: 'Select target language'
    });
    let target = language.find(item => item[1] === res);
    if (target) {
        await configuration.update('targetLanguage', target[0]);
    }
}


export async function showTargetLanguageStatusBarItem(userLanguage: string) {
    let targetBar = window.createStatusBarItem();
    targetBar.command = 'commentTranslateBaidu.changeTargetLanguage';
    targetBar.tooltip = 'Comment translate target language. click to change';

    let setLanguageText = async () => {
        let configuration = workspace.getConfiguration('commentTranslateBaidu');
        let currentLanguage: string = (await configuration.get<string>('targetLanguage')) || userLanguage;
        let current = language.find(item => item[0].toLowerCase() === currentLanguage.toLowerCase());
        if (current) {
            targetBar.text = '$(globe) ' + current[1];
        }
    }
    await setLanguageText();
    targetBar.show();
    workspace.onDidChangeConfiguration(async eventNames => {
        if (eventNames.affectsConfiguration('commentTranslateBaidu')) {
            await setLanguageText();
        };
    })
    return targetBar;
}
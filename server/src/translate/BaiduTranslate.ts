import { BaseTranslate, ITranslateOptions } from './translate';
const translate = require('translate-baidu2')

//免费API https://github.com/Selection-Translator/translation.js/tree/master/src
export class BaiduTranslate extends BaseTranslate {
    // private _requestErrorTime: number = 0;
    // async _request(content: string, { from = 'auto', to = 'auto' }: ITranslateOptions): Promise<string> {
    //     let res = await translate(content, { from: from, to: to });
    //     console.log(res);
        
    //     return res.dst;
    // }

    link(content: string, { to = 'auto' }: ITranslateOptions): string {
        // [fix] 参数变化zh-cn -> zh-CN。
        // let [first, last] = to.split('-');
        // if (last) {
        //     last = last.toLocaleUpperCase();
        //     to = `${first}-${last}`;
        // }

        let str = `https://fanyi.baidu.com/translate?aldtype=16047&query=${encodeURIComponent(content)}&smartresult=dict&lang=auto2${to}#en/${to}/${encodeURIComponent(content)}`;
        return `[Baidu](${encodeURI(str)})`;
        // return `<a href="${encodeURI(str)}">Google</a>`;
    }

    async _translate(content: string, opts: ITranslateOptions): Promise<string> {
        let result = '';
        // 上一次失败的时间间隔小于5分钟，直接返回空
        // if (Date.now() - this._requestErrorTime <= 5 * 60 * 1000) {
        //     return result;
        // }
        try {
            let res = await translate(content, opts); 
            result = res.dst
            this._onTranslate.fire(
                `[Baidu Translate]:${content}[<============================>]:${result}`
            );
        } catch (e) {
            // this._requestErrorTime = Date.now();
            this._onTranslate.fire(
                `[Baidu Translate]: request error\n ${JSON.stringify(e)} \n Try again in 5 minutes.`
            );
        }
        return result;
    }
}

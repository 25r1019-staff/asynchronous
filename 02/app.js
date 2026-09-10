// ============================================================
// 第2講：async / await ハンズオン
// 「お茶を淹れる」を例に、async/await の使い方を学びます
// ============================================================

// 出力関数
function log(message) {
    const output = document.getElementById('output');
    output.innerHTML += message + '\n';
    output.scrollTop = output.scrollHeight;
}

// ============================================================
// 準備：時間のかかる作業を Promise で作る関数
// 水を沸かす（2秒） / 茶葉を入れる（1秒）
// ============================================================
function boilWater() {
    return new Promise((resolve) => {
        log('🔥 お湯を沸かしています…（2秒）');
        setTimeout(() => {
            resolve('お湯が沸きました');
        }, 2000);
    });
}

function putTea() {
    return new Promise((resolve) => {
        log('🍵 茶葉を入れています…（1秒）');
        setTimeout(() => {
            resolve('お茶ができました');
        }, 1000);
    });
}

// ============================================================
// 例1: 従来の書き方（Promise チェーン）
// 「まずお湯を沸かす」→「そのあと茶葉を入れる」
// ============================================================
function example1() {
    log('--- 例1: Promise チェーンで書く ---');

    boilWater()
        .then((message1) => {
            log(message1);
            // 沸いたあとに次へ進む
            return putTea();
        })
        .then((message2) => {
            log(message2);
        });
}

// ============================================================
// 例2: async / await で書く（読みやすい！）
// ============================================================
async function example2() {
    log('--- 例2: async / await で書く ---');

    // await で「完了を待つ」。上から順に進む
    const message1 = await boilWater();
    log(message1);

    const message2 = await putTea();
    log(message2);

    log('✅ すべて完了（await で待っているので順番が守られる）');
}

// ============================================================
// 例3: async 関数は Promise を返す
// 関数の結果を await で受け取ることができる
// ============================================================
async function makeTea() {
    const m1 = await boilWater();
    log(m1);
    const m2 = await putTea();
    log(m2);
    return '出来上がったお茶です';   // これを Promise で返す
}

// async 関数を呼んで、返り値を await で受け取る
async function example3() {
    log('--- 例3: async 関数の返り値を受け取る ---');

    const result = await makeTea();
    log('返り値を受け取った: ' + result);
}

// ============================================================
// 例4: エラーが起きたら try / catch
// ============================================================
function makeFailingTea() {
    return new Promise((resolve, reject) => {
        log('⚡ 停電が発生…');
        setTimeout(() => {
            reject(new Error('お湯が沸かせません'));
        }, 1000);
    });
}

async function example4() {
    log('--- 例4: try / catch でエラーを処理 ---');

    try {
        const message = await makeFailingTea();
        log(message);   // ここは実行されない
    } catch (error) {
        log('エラーをキャッチ: ' + error.message);
    }

    log('その後も処理を続けられる');
}

// ページを開いたときの案内
window.onload = function () {
    log('async / await ハンズオン');
    log('例1 → 例4 を順番に実行して、書き方の違いを確認しましょう');
    log('-------------------------------------------');
};

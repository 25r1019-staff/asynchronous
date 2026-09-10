// ============================================================
// 第3講：Fetch でデータを取得しよう ハンズオン
// 無料のテストAPI「JSONPlaceholder」を使います
// ============================================================

// 出力関数
function log(message) {
    const output = document.getElementById('output');
    output.innerHTML += message + '\n';
    output.scrollTop = output.scrollHeight;
}

// テスト用APIのベースURL（このURLにリクエストを送る）
const API = 'https://jsonplaceholder.typicode.com';

// ============================================================
// 例1: fetch で「データを持ってくる」
// fetch(url) でサーバーに問い合わせて、データをもらう
// ============================================================
async function example1() {
    log('--- 例1: fetch の基本形 ---');
    log('URL: ' + API + '/users/1\n');

    // ① サーバーに取りに行く（通信が終わるまで待つ = await）
    const response = await fetch(API + '/users/1');

    // ② 返ってきたデータを JSON として読み取る
    const user = await response.json();

    // ③ 中身を見てみる
    log('名前: ' + user.name);
    log('メール: ' + user.email);
    log('(ユーザーを1人取得できました)');
}

// ============================================================
// 例2: 一覧でデータを取得する
// 戻り値が「配列」になる例
// ============================================================
async function example2() {
    log('--- 例2: 一覧を取得する ---');
    log('URL: ' + API + '/posts\n');

    const response = await fetch(API + '/posts');
    const posts = await response.json();

    log('投稿の数: ' + posts.length + '件');
    log('');

    // 最初の3件だけ、タイトルを表示
    for (let i = 0; i < 3; i++) {
        log((i + 1) + '件目: ' + posts[i].title);
    }
}

// ============================================================
// 例3: データを送る（POST）
// createPost 関数をユーザーの操作と合わせて使う例
// ============================================================
async function example3() {
    log('--- 例3: データを送ってみる（POST）---\n');

    // 送るデータ（オブジェクト）
    const newTask = {
        title: '買い物に行く',
        completed: false
    };

    // fetch に第2引数で「どう送るか」を教える
    const response = await fetch(API + '/todos', {
        method: 'POST',                          // 「新しく作って」という意味
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)            // オブジェクトを文字列に変換して送る
    });

    const created = await response.json();
    log('新しいTODOのID: ' + created.id);
    log('タイトル: ' + created.title);
    log('(サーバーが「作ったよ」と返してきました)');
}
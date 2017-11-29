//  引入项目需要的库
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
require('electron-reload')(__dirname);
let mainWin = null; //  主体窗口

const menuTemplate = [{
    label: 'Application',
    submenu: [{
            label: '关于程序',
            click: () => {
                console.log('您点击了关于本程序');
                mainWin.webContents.openDevTools();
            }
        },
        {
            'label': '偏好设置',
            accelerator: 'CmdOrCtrl+,'
        },
        {
            label: '更新',
            click: () => {
                console.log('您点击了更新产品');
            }
        },
        {
            label: '隐藏程序',
            accelerator: 'CmdOrCtrl+H',
            click: () => {
                mainWin.minimize();
            }
        },
        {
            label: '隐藏其它',
            accelerator: 'Shift+CmdOrCtrl+H'
        },
        {
            label: '退出',
            accelerator: 'CmdOrCtrl+Q',
            click: () => {
                app.quit();
            }
        }
    ]
}]; //  菜单

app.on('ready', () => {
    //  新建窗口
    mainWin = new BrowserWindow({
        width: 980,
        height: 674,
        title: '我的第一个Electron应用',
        titleBarStyle: 'hidden'
    });

    //  主体窗口加载文件
    mainWin.loadURL(`file://${__dirname}/index.html`);

    //  主体窗口关闭
    mainWin.on('closed', () => {
        mainWin = null;
    });

    let menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

});

//  
app.on('window-all-close', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
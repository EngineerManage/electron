//  引入项目需要的库
const { app, BrowserWindow, Menu, ipcMain } = require('electron');

let mainWin = null; //  主体窗口

const menuTemplate = [{
    label: 'Application',
    submenu: [{
            label: '关于程序',
            click: () => {
                console.log('您点击了关于本程序');
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
            click:() =>{
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
        width: 800,
        height: 600
    });

    //  主体窗口加载文件
    mainWin.loadURL(`file://${__dirname}/index.html`);

    //  打开开车者调试工具
    // mainWin.webContents.openDevTools();

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

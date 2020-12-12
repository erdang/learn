import 'scss/base.scss';
import 'scss/appmate/blind-authority.scss';

import urlTool from 'ox-util/lib/url.js';
import setTitle from 'utility/settitle.js';
import appGate from 'utility/appgate.js';
import vgate from 'utility/vgate.js';
import user from 'utility/user.js';

import {Fragment, useState, useCallback, useEffect} from 'react';
import {PageSpinner} from 'component/spinner.js';
import DrawerOverlay from 'component/draweroverlay.js';
import Portal from 'component/portal.js';
import CenterOverlay from 'component/centeroverlay.js';

const searchParam = urlTool.param(location.search);
const context = appGate.getContext();

function toast(msg) {
    if (appGate.inApp()) {
        appGate.toast(msg);
    } else {
        self.alert(msg);
    }
}

function closeWebView() {
    if (appGate.inApp()) {
        appGate.close();
    } else {
        toast('close');
    }
}

function BlindAlert({showalert, info, fn, act, getInfo}) {
    let closefn = useCallback(() => {
        showalert(false);
        getInfo();
    }, [showalert, getInfo]);
    let surefn = useCallback(() => {
        showalert(false);
        fn(act);
    }, [showalert, fn, act]);
    return (
        <Portal>
            <CenterOverlay>
                <div className="blind-alert">
                    <div className="alert-info">{info}</div>
                    <div className="alert-btn">
                        <div className="sure-btn" onClick={surefn}>
                            确定
                        </div>
                        <div className="close-btn" onClick={closefn}>
                            取消
                        </div>
                    </div>
                </div>
            </CenterOverlay>
        </Portal>
    );
}
function ScoreContent(props) {
    var {dataContent, setshowalert, setcurrent, current} = props;

    let liFn = useCallback(
        (event) => {
            let index = event.currentTarget.dataset.index;
            setcurrent(index);
            setshowalert(true);
        },
        [setcurrent, setshowalert]
    );

    var listContent =
        dataContent &&
        dataContent.scoreOptions.map((item, index) => {
            return (
                <li
                    key={item.value}
                    className={item.value == current ? 'active' : ''}
                    data-index={index}
                    onClick={liFn}>
                    {item.value}
                </li>
            );
        });
    return (
        <div className="score-content">
            <div className="title-text">评分：</div>
            <ul>{listContent}</ul>
        </div>
    );
}
function MinuteContent(props) {
    var {
        dataContent,
        setminutealert,
        setminute,
        minute,
        cancelSinking,
        act
    } = props;

    let liFn = useCallback(
        (event) => {
            let index = event.currentTarget.dataset.index;
            setminute(index);
            setminutealert(true);
        },
        [setminute, setminutealert]
    );

    let canaleFn = useCallback(() => {
        cancelSinking(act);
    }, [act, cancelSinking]);

    var listContent =
        dataContent &&
        dataContent.sinkingOptions.map((item, index) => {
            return (
                <li
                    key={item.value}
                    className={item.value == minute ? 'active' : ''}
                    data-index={item.value}
                    onClick={liFn}>
                    {item.name}
                </li>
            );
        });
    return (
        <div className="min-content">
            <div className="title-text">下沉时长：</div>
            <ul>
                {listContent}
                <li className="time-cancle" onClick={canaleFn}>
                    取消
                </li>
            </ul>
        </div>
    );
}
function CloseContent(props) {
    let {setlivealert, dataContent, selvalue, setselvalue} = props;

    let opcontent = null;
    let closeFnLive = useCallback(() => {
        setlivealert(true);
    }, [setlivealert]);
    opcontent = dataContent.closeOptions.map((item, index) => {
        return (
            <option value={item} key={index}>
                {item}
            </option>
        );
    });

    let selFn = useCallback(
        (event) => {
            let val = event.target.value;
            setselvalue(val);
        },
        [setselvalue]
    );
    return (
        <div className="close-content">
            <div className="title-text">关闭直播：</div>
            <div className="close-wap">
                <div className="live-reason">
                    <div className="titlle">关闭理由：</div>
                    <select name="" id="" value={selvalue} onChange={selFn}>
                        {opcontent}
                    </select>
                </div>
                <div className="close-div" onClick={closeFnLive}>
                    关闭直播
                </div>
            </div>
        </div>
    );
}
function DayContent(props) {
    let {
        setdayalert,
        dataContent,
        onevalue,
        setonevalue,
        oneday,
        setoneday
    } = props;

    let opcontent = null;
    let daycontent = null;
    let closeFnLive = useCallback(() => {
        setdayalert(true);
    }, [setdayalert]);
    opcontent = dataContent.closeOptions.map((item, index) => {
        return (
            <option value={item} key={index}>
                {item}
            </option>
        );
    });
    daycontent = dataContent.bannedOptions.map((item, index) => {
        return (
            <option value={item.value} key={index}>
                {item.name}
            </option>
        );
    });

    let selFn = useCallback(
        (event) => {
            let val = event.target.value;
            setonevalue(val);
        },
        [setonevalue]
    );
    let seloneFn = useCallback(
        (event) => {
            let val = event.target.value;
            setoneday(val);
        },
        [setoneday]
    );
    return (
        <div className="close-content">
            <div className="title-text">封号：</div>
            <div className="close-wap">
                <div className="day-res">
                    <div className="live-reason">
                        <div className="titlle">封号理由：</div>
                        <select name="" id="" value={onevalue} onChange={selFn}>
                            {opcontent}
                        </select>
                    </div>
                    <div className="live-reason">
                        <div className="titlle">封号天数：</div>
                        <select
                            name=""
                            id=""
                            value={oneday}
                            onChange={seloneFn}>
                            {daycontent}
                        </select>
                    </div>
                </div>
                <div className="close-div" onClick={closeFnLive}>
                    封号
                </div>
            </div>
        </div>
    );
}
function BlindAuthority() {
    var [dataContent, setdataContent] = useState(undefined);
    var [showalert, setshowalert] = useState(false);
    var [minutealert, setminutealert] = useState(false);
    var [livealert, setlivealert] = useState(false);
    var [dayalert, setdayalert] = useState(false);
    var [current, setcurrent] = useState(-1);
    var [minute, setminute] = useState(-1);
    let [selvalue, setselvalue] = useState('空镜头');
    let [onevalue, setonevalue] = useState('空镜头');
    let [oneday, setoneday] = useState(72);
    let getInfo = useCallback(() => {
        vgate('videoLove-room-getScore.php', {
            ruid: searchParam.rid || searchParam.pageid || context.pageid
        }).then((data) => {
            if (data.flag == '001') {
                setdataContent(data.content);
                setcurrent(Number(data.content.score));
                setminute(Number(data.content.sinking));
            } else if (data.flag == '203') {
                user.toLogin();
            } else {
                toast(data.context);
            }
        });
    }, []);
    let setScoreFn = useCallback(
        (act) => {
            vgate('videoLove-room-setScore.php', {
                ruid: searchParam.rid || searchParam.pageid || context.pageid,
                act: act,
                score: current,
                minute: minute,
                why: selvalue,
                day: oneday
            }).then((data) => {
                if (data.flag == '001') {
                    alert(data.content);
                    getInfo();
                } else if (data.flag == '203') {
                    user.toLogin();
                } else {
                    toast(data.content);
                }
            });
        },
        [current, minute, selvalue, oneday, getInfo]
    );
    useEffect(() => {
        setTitle('官方权限');
    }, []);
    useEffect(() => {
        getInfo();
    }, [getInfo]);

    let ScoreInfo = (
        <Fragment>
            <div>该红娘的评分更改为{current}分！</div>
            <div>红娘评分越高 </div>
            <div>在交友厅的推荐排名越靠前</div>
        </Fragment>
    );
    let MinuteInfo = (
        <Fragment>
            <div>该主播在交友厅的位置将</div>
            <div>
                下沉至最末尾,时长为
                {minute == '99999' ? '永久' : minute + '分钟'}
            </div>
        </Fragment>
    );
    let LiveCloseInfo = (
        <Fragment>
            <div>该房间因为{selvalue}被关闭直播</div>
            <div>确定要关闭改直播吗？</div>
        </Fragment>
    );

    let days = function () {
        let da = '';
        dataContent &&
            dataContent.bannedOptions.forEach((item, index) => {
                if (Number(item.value) == oneday) {
                    da = item.name;
                }
            });
        return da;
    };

    let DayCloseInfo = (
        <Fragment>
            <div>
                该房间因为{onevalue}被封号{days()}
            </div>
            <div>是否确认封号？</div>
        </Fragment>
    );

    var result = null;
    if (dataContent) {
        result = (
            <DrawerOverlay onClose={closeWebView} className="blind-authority">
                <div className="title"></div>
                <div className="close-draw" onClick={closeWebView}>
                    <div></div>
                </div>
                <ScoreContent
                    dataContent={dataContent}
                    setshowalert={setshowalert}
                    current={current}
                    setcurrent={setcurrent}
                />
                <MinuteContent
                    dataContent={dataContent}
                    setminutealert={setminutealert}
                    minute={minute}
                    setminute={setminute}
                    cancelSinking={setScoreFn}
                    act={'cancelSinking'}
                />
                <CloseContent
                    dataContent={dataContent}
                    setlivealert={setlivealert}
                    selvalue={selvalue}
                    setselvalue={setselvalue}
                />
                <DayContent
                    dataContent={dataContent}
                    setdayalert={setdayalert}
                    oneday={oneday}
                    setoneday={setoneday}
                    onevalue={onevalue}
                    setonevalue={setonevalue}
                />
                {showalert && (
                    <BlindAlert
                        showalert={setshowalert}
                        info={ScoreInfo}
                        fn={setScoreFn}
                        act={'setScore'}
                        getInfo={getInfo}
                    />
                )}
                {minutealert && (
                    <BlindAlert
                        showalert={setminutealert}
                        info={MinuteInfo}
                        fn={setScoreFn}
                        act={'sinking'}
                        getInfo={getInfo}
                    />
                )}
                {livealert && (
                    <BlindAlert
                        showalert={setlivealert}
                        info={LiveCloseInfo}
                        fn={setScoreFn}
                        act={'liveClose'}
                        getInfo={getInfo}
                    />
                )}
                {dayalert && (
                    <BlindAlert
                        showalert={setdayalert}
                        info={DayCloseInfo}
                        fn={setScoreFn}
                        act={'banned'}
                        getInfo={getInfo}
                    />
                )}
            </DrawerOverlay>
        );
    } else if (!dataContent) {
        result = <PageSpinner />;
        console.log(2)
    }
    return result;
}
export default BlindAuthority;

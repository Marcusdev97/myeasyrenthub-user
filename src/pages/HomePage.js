import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 导入 Link 组件用于导航
import wechatQR from '../images/wechatNamecard.jpg'; // 引入二维码图片
import '../styles/HomePage.css';

function HomePage() {
  useEffect(() => {
    const frames = document.querySelectorAll('.frame');
    const handleScroll = () => {
      frames.forEach((frame) => {
        const frameTop = frame.getBoundingClientRect().top;
        if (frameTop < window.innerHeight * 0.8) {
          frame.classList.add('show');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);

    // 清除事件监听器，防止内存泄漏
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // State 用于控制模态框的显示和隐藏
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.addEventListener('keydown', handleEsc); // 监听键盘事件
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.removeEventListener('keydown', handleEsc); // 关闭时移除键盘监听
  };

  const handleEsc = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  return (
    <div className="home-page">
      {/* 主页标题和欢迎语 */}
      <h1 className="main-title">欢迎来到易租屋</h1>
      <p className="sub-title">我们提供一站式租房与换汇服务，轻松便捷！</p>

      {/* 租房服务 */}
      <div className="frame frame-left">
        <h2>租房服务</h2>
        <p>我们专注于泰来大学附近的租房服务，提供各地区的推荐和详细的价位介绍。</p>
        <a href="/properties" className="action-button">了解更多</a>
        {/* 新的“了解地区”按钮 */}
        <Link to="/locations" className="action-button">了解地区</Link>
      </div>

      {/* 换汇服务 */}
      <div className="frame frame-right">
        <h2>换汇服务</h2>
        <p>快速提供人民币到马来西亚林吉特的换汇服务，点击下方按钮获取微信二维码。</p>
        <button className="action-button" onClick={openModal}>获取微信二维码</button>
      </div>

      {/* 开发中的业务 */}
      <div className="frame frame-left">
        <h2>开发中的业务</h2>
        <p>敬请期待，我们即将推出更多的便利服务！</p>
      </div>

      {/* 模态框 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>扫描微信二维码</h2>
            <img src={wechatQR} alt="微信二维码" className="qr-code-img" />
            <p>请在备注中标注“汇率”</p>
            <button className="close-button" onClick={closeModal}>关闭</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;

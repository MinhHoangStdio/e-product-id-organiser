const motivationItems = [
  {
    iconPath: "/icons/planning.png",
    title: "Dễ dàng Quản lý Sản phẩm và Sản xuất",
    subtitle:
      "Ứng dụng cung cấp một nền tảng thuận tiện để người dùng đăng sản phẩm của mình và quản lý quy trình sản xuất. Hệ thống này giúp người dùng kiểm soát việc tạo ra sản phẩm, đảm bảo sự đơn giản và tiện lợi trong quá trình này.",
  },
  {
    iconPath: "/icons/products.png",
    title: "Phê duyệt Sản phẩm và Chia sẻ QR Code",
    subtitle:
      "Ứng dụng giúp người dùng dễ dàng theo dõi tình trạng phê duyệt của sản phẩm và khi sản phẩm được phê duyệt, người dùng có thể tải xuống QR Code để chia sẻ với người khác. Một cách mới và hữu ích để quảng cáo sản phẩm.",
  },
  {
    iconPath: "/icons/clock.png",
    title: "Tiết kiệm thời gian và Tối ưu hóa quy trình",
    subtitle:
      "Ứng dụng giúp người dùng tiết kiệm thời gian bằng cách tối ưu hóa quy trình tạo và quản lý sản phẩm. Điều này giúp người dùng tập trung vào việc tạo ra sản phẩm chất lượng hơn và tạo ra trải nghiệm dễ dàng và hiệu quả hơn",
  },
  {
    iconPath: "/icons/qr-code.png",
    title: "Tích hợp QR Code, tiện lợi cho người tiêu dùng",
    subtitle:
      "Cung cấp tích hợp QR Code, giúp người tiêu dùng dễ dàng truy cập thông tin sản phẩm. Điều này tạo ra một kết nối trực tiếp giữa người dùng và sản phẩm, giúp tăng cường tương tác và tin tưởng từ phía khách hàng.",
  },
];

export default function Motivation() {
  return (
    <section
      id="about"
      className="py-14 bg-neutral-light-grayish-blue lg:py-24"
    >
      <div className="container text-center lg:text-left">
        <div className="grid lg:grid-cols-2 mb-12 lg:mb-16">
          <div className="col-span-1">
            <h2 className="text-3xl lg:text-4xl text-primary-dark-blue pb-5">
              Tại sao nên chọn E-Product ID?
            </h2>
            <p className="text-neutral-grayish-blue text-sm lg:text-base leading-5">
              Ứng dụng giúp người dùng dễ dàng đăng sản phẩm, quản lý quy trình
              sản xuất, phê duyệt sản phẩm, và chia sẻ QR Code, tạo ra một trải
              nghiệm đơn giản và tiện lợi.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-9 lg:gap-6 lg:grid-cols-4">
          {motivationItems.map((item) => (
            <div key={item.title} className="justify-center">
              <div className="flex justify-center lg:justify-start">
                <img
                  className="w-[25%] lg:w-[40%]"
                  src={item.iconPath}
                  alt=""
                />
              </div>

              <h2 className="text-lg text-primary-dark-blue py-4 lg:pt-9 lg:pb-6 lg:text-xl lg:font-bold">
                {item.title}
              </h2>
              <p className="text-neutral-grayish-blue text-sm font-light lg:text-base leading-5">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

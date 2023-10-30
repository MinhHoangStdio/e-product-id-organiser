const motivationItems = [
  {
    iconPath: "/icons/planning.png",
    title: "Dễ dàng quản lý",
    subtitle:
      "Cung cấp một nền tảng đơn giản để người dùng giới thiệu sản phẩm, minh bạch quy trình sản xuất và quản lý hàng hóa hiệu quả.",
  },
  {
    iconPath: "/icons/products.png",
    title: "Phê duyệt và chia sẻ QR Code sản phẩm",
    subtitle:
      "Product ID giúp người dùng dễ dàng theo dõi tình trạng phê duyệt và chia sẻ mã QR Code của sản phẩm. Quảng cáo nay nhanh chóng và đơn giản hơn.",
  },
  {
    iconPath: "/icons/clock.png",
    title: "Tối ưu hóa thời gian và quy trình",
    subtitle:
      "Ứng dụng giúp người dùng tiết kiệm thời gian và tạo ra sản phẩm chất lượng hơn bằng cách tối ưu hóa quy trình tạo và quản lý sản phẩm.",
  },
  {
    iconPath: "/icons/qr-code.png",
    title: "Tích hợp QR Code",
    subtitle:
      "Tích hợp QR Code giúp người tiêu dùng dễ dàng truy cập thông tin và tìm hiểu về sản phẩm, thúc đẩy tiêu dùng và xây dựng niềm tin với thương hiệu.",
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
              Product ID - Giải pháp tiếp cận khách hàng hiệu quả
            </h2>
            <p className="text-neutral-grayish-blue text-sm lg:text-base leading-5">
              Nền tảng kết nối nhà cung cấp và khách hàng, thúc đẩy tiêu dùng
              đơn giản và hiệu quả.
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

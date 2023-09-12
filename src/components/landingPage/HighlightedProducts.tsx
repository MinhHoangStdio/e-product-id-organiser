import { Link } from "react-router-dom";

const articles = [
  {
    author: "Doanh nghiệp Hòa Đặng",
    title: "Nước dừa tươi Vietcoco Organic 330ml",
    description:
      "Một trong những loại nước trái cây thơm ngon hấp dẫn, tươi mát giúp giải nhiệt hiệu quả, nước dừa Vietcoco là lựa chọn chất lượng,...",
    imgPath:
      "https://be-eproductid.stdio.asia/eproduct-id/images/products/image-1693381069647.jpeg",
    imgAlt: "img",
    to: "/public/consignments/gAAAAABk_uz9ZmypRj8ltht_-Ubow5eXpzYERE5ddHK2HtfYSlTBzklr_TvWSwMmOjJZqG3GRcGn_TOS7Dj1IntkQfbXZIOaaw==",
  },
  {
    author: "Doanh nghiệp Minh Hoàng",
    title: "Cá ngừ ngâm dầu Tuna Việt Nam hộp 140g",
    description:
      "Cá ngừ ngâm dầu Tuna Việt Nam lon 140g là sản phẩm cá hộp mang đến hương vị cá ngừ truyền thống. Với phần thịt cá ngừ...",
    imgPath:
      "https://be-eproductid.stdio.asia/eproduct-id/images/products/ca-ngu-ngam-dau-tuna-viet-nam-lon-140g-202202101349519200.jpeg",
    imgAlt: "img2",
    to: "/public/consignments/gAAAAABk_uuKrwG-ihp4rUAc0ydMbb_IOndTHtk1vbrIChzhCRtSKSjeMbcJ-c6HhaHc8k71XyHx8mi6jOTUFT07u-MdOao-mw==",
  },
  {
    author: "Doanh nghiệp Hòa Đặng",
    title: "Nước dừa tươi Vietcoco Organic 330ml",
    description:
      "Một trong những loại nước trái cây thơm ngon hấp dẫn, tươi mát giúp giải nhiệt hiệu quả, nước dừa Vietcoco là lựa chọn chất lượng,...",
    imgPath:
      "https://be-eproductid.stdio.asia/eproduct-id/images/products/image-1693381069647.jpeg",
    imgAlt: "img3",
    to: "/public/consignments/gAAAAABk_uz9ZmypRj8ltht_-Ubow5eXpzYERE5ddHK2HtfYSlTBzklr_TvWSwMmOjJZqG3GRcGn_TOS7Dj1IntkQfbXZIOaaw==",
  },
  {
    author: "Doanh nghiệp Minh Hoàng",
    title: "Cá ngừ ngâm dầu Tuna Việt Nam hộp 140g",
    description:
      "Cá ngừ ngâm dầu Tuna Việt Nam lon 140g là sản phẩm cá hộp mang đến hương vị cá ngừ truyền thống. Với phần thịt cá ngừ...",
    imgPath:
      "https://be-eproductid.stdio.asia/eproduct-id/images/products/ca-ngu-ngam-dau-tuna-viet-nam-lon-140g-202202101349519200.jpeg",
    imgAlt: "img4",
    to: "/public/consignments/gAAAAABk_uuKrwG-ihp4rUAc0ydMbb_IOndTHtk1vbrIChzhCRtSKSjeMbcJ-c6HhaHc8k71XyHx8mi6jOTUFT07u-MdOao-mw==",
  },
];

export default function HighlightedProducts() {
  return (
    <section id="products" className="py-14 lg:py-24">
      <div className="container">
        <h2 className="text-center text-3xl lg:text-4xl text-primary-dark-blue mb-5 lg:text-left lg:mb-10">
          Sản phẩm nổi bật
        </h2>
        <div className="grid grid-cols-1 gap-5 lg:gap-7 lg:grid-cols-4">
          {articles.map((article) => (
            <article key={article.title} className="bg-white">
              <div className="aspect-w-16 aspect-h-10 lg:aspect-w-4 lg:aspect-h-3">
                <img
                  className="object-cover"
                  src={article.imgPath}
                  alt={article.imgAlt}
                />
              </div>

              <div className="px-7 pt-5 pb-10 lg:p-6">
                <span className="text-neutral-grayish-blue text-xs">
                  {article.author}
                </span>
                <Link to={article.to}>
                  {" "}
                  <h4 className="text-primary-dark-blue text-sm py-2 hover:text-green-400">
                    {article.title}
                  </h4>
                </Link>

                <p className="text-neutral-grayish-blue text-xs">
                  {article.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

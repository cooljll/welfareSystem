<template>
    <div class="page-wrapper">
        <div class="wrapper-title">
            <span class="line"></span>
            <span class="title">帮助中心</span>
        </div>
        <div class="wrapper-center">
            <ul>
                <li>
                    <img src="../../assets/img/hplist1.png" alt="">
                    <p class="hp1">注册</p>
                    <p class="hp2">注册条款</p>
                    <a href="javascript:;" class="listmore" @click="seeDetails(1)">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/img/hplist2.png" alt="">
                    <p class="hp1">有米拿礼品卡</p>
                    <p class="hp2">有米拿礼品卡</p>
                    <a href="javascript:;" class="listmore" @click="seeDetails(2)">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/img/hplist3.png" alt="">
                    <p class="hp1">积分充值</p>
                    <p class="hp2">积分充值条款</p>
                    <a href="javascript:;" class="listmore" @click="seeDetails(3)">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/img/hplist4.png" alt="">
                    <p class="hp1">积分规则</p>
                    <p class="hp2">积分使用规则</p>
                    <a href="javascript:;" class="listmore" @click="seeDetails(4)">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/img/hplist5.png" alt="">
                    <p class="hp1">常见问题</p>
                    <p class="hp2">常见问题</p>
                    <a href="javascript:;" class="listmore" @click="seeDetails(5)">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/img/hplist6.png" alt="">
                    <p class="hp1">礼品卡激活</p>
                    <p class="hp2">激活礼品卡</p>
                    <a href="javascript:;" class="listmore" @click="seeDetails(6)">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/img/hplist7.png" alt="">
                    <p class="hp1">购物</p>
                    <p class="hp2">购物流程</p>
                    <a href="javascript:;" class="listmore" @click="seeDetails(7)">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/img/hplist8.png" alt="">
                    <p class="hp1">登陆</p>
                    <p class="hp2">登陆流程</p>
                    <a href="javascript:;" class="listmore" @click="seeDetails(8)">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/img/hplist9.png" alt="">
                    <p class="hp1">积分介绍</p>
                    <p class="hp2">领取与使用积分</p>
                    <a href="javascript:;" class="listmore" @click="seeDetails(9)">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/img/hplist10.png" alt="">
                    <p class="hp1">快递配送</p>
                    <p class="hp2">运费与方式</p>
                    <a href="javascript:;" class="listmore" @click="seeDetails(10)">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/img/hplist11.png" alt="">
                    <p class="hp1">售后服务</p>
                    <p class="hp2">退换货</p>
                    <a href="javascript:;" class="listmore" @click="seeDetails(11)">查看详情></a>
                </li>
                <li>
                    <img src="../../assets/img/hplist12.png" alt="">
                    <p class="hp1">特色服务</p>
                    <p class="hp2">便民服务 越洋拿</p>
                    <a href="javascript:;" class="listmore" @click="seeDetails(12)">查看详情></a>
                </li>
            </ul> 
        </div> 
        <el-dialog title="帮助中心" :visible.sync="helpCenterVisible1" :close-on-click-modal="false" class="helpCeterDialog" style="top:10%">
            <div class="layer_content">
                <p style="text-align: center;"><span style="font-size: 12pt;"><strong>有米拿注册协议</strong></span></p>
                <p><span style="font-size: 12pt;">本协议是您与有米拿网站（简称"本站"或“有米拿”，网址：www.youmina.com）所有者金划算科技股份有限公司（以下简称为"金划算公司"）之间就有米拿服务等相关事宜所订立的契约，请您仔细阅读本注册协议，您点击"同意并继续"按钮后，本协议即构成对双方有约束力的法律文件。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>一、</strong><strong>本站服务条款的确认和接纳</strong></span></p>
                <p><span style="font-size: 12pt;">1.1本站的各项电子服务的所有权和运作权归金划算公司所有。用户同意所有注册协议条款并完成注册程序，才能成为本站的正式用户。用户确认：本协议条款是处理双方权利义务的契约，始终有效，法律另有强制性规定或双方另有特别约定的，依其规定。</span>
                </p>
                <p><span style="font-size: 12pt;">1.2用户点击同意本协议的，即视为用户确认自己具有享受本站服务、下单购物等相应的权利能力和行为能力，能够独立承担法律责任。</span>
                </p>
                <p><span style="font-size: 12pt;">1.3如果您在18周岁以下，您只能在父母或监护人的监护参与下才能使用本站。</span></p>
                <p><span style="font-size: 12pt;">1.4有米拿保留在中华人民共和国大陆地区法施行之法律允许的范围内独自决定拒绝服务、关闭用户账户、清除或编辑内容或取消订单的权利。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>二、本站服务</strong></span></p>
                <p><span style="font-size: 12pt;">2.1有米拿通过互联网依法为用户提供互联网信息等服务，用户在完全同意本协议及本站规定的情况下，方有权使用本站的相关服务。</span>
                </p>
                <p><span style="font-size: 12pt;">2.2用户必须自行准备如下设备和承担如下开支：（1）上网设备，包括并不限于电脑或者其他上网终端、调制解调器及其他必备的上网装置；（2）上网开支，包括并不限于网络接入费、上网设备租用费、手机流量费等。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>三、用户信息</strong></span></p>
                <p><span style="font-size: 12pt;">3.1用户应自行诚信向本站提供注册资料，用户同意其提供的注册资料真实、准确、完整、合法有效，用户注册资料如有变动的，应及时更新其注册资料。如果用户提供的注册资料不合法、不真实、不准确、不详尽的，用户需承担因此引起的相应责任及后果，并且有米拿保留终止用户使用有米拿各项服务的权利。</span>
                </p>
                <p><span style="font-size: 12pt;">3.2用户在本站进行浏览、下单购物等活动时，涉及用户真实姓名/名称、通信地址、联系电话、电子邮箱等隐私信息的，本站将予以严格保密，除非得到用户的授权或法律另有规定，本站不会向外界披露用户隐私信息。</span>
                </p>
                <p><span style="font-size: 12pt;">3.3用户注册成功后，将产生用户名和密码等账户信息，您可以根据本站规定改变您的密码。用户应谨慎合理的保存、使用其用户名和密码。用户若发现任何非法使用用户账号或存在安全漏洞的情况，请立即通知本站并向公安机关报案。</span>
                </p>
                <p><span style="font-size: 12pt;">3.4用户同意，有米拿拥有通过邮件、短信电话等形式，向在本站注册、购物用户、收货人发送订单信息、促销活动等告知信息的权利。</span>
                </p>
                <p><span style="font-size: 12pt;">3.5用户不得将在本站注册获得的账户借给他人使用，否则用户应承担由此产生的全部责任，并与实际使用人承担连带责任。</span>
                </p>
                <p><span style="font-size: 12pt;">3.6用户同意，有米拿有权使用用户的注册信息、用户名、密码等信息，登录进入用户的注册账户，进行证据保全，包括但不限于公证、见证等。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>四、用户依法言行义务</strong></span></p>
                <p><span style="font-size: 12pt;">本协议依据国家相关法律法规规章制定，用户同意严格遵守以下义务：</span></p>
                <p><span style="font-size: 12pt;">（1）不得传输或发表：煽动抗拒、破坏宪法和法律、行政法规实施的言论，煽动颠覆国家政权，推翻社会主义制度的言论，煽动分裂国家、破坏国家统一的的言论，煽动民族仇恨、民族歧视、破坏民族团结的言论；</span>
                </p>
                <p><span style="font-size: 12pt;">（2）从中国大陆向境外传输资料信息时必须符合中国有关法规；</span></p>
                <p><span style="font-size: 12pt;">（3）不得利用本站从事洗钱、窃取商业秘密、窃取个人信息等违法犯罪活动；</span></p>
                <p><span style="font-size: 12pt;">（4）不得干扰本站的正常运转，不得侵入本站及国家计算机信息系统；</span></p>
                <p><span style="font-size: 12pt;">（5）不得传输或发表任何违法犯罪的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的，淫秽的、不文明的等信息资料；</span>
                </p>
                <p><span style="font-size: 12pt;">（6）不得传输或发表损害国家社会公共利益和涉及国家安全的信息资料或言论；</span></p>
                <p><span style="font-size: 12pt;">（7）不得教唆他人从事本条所禁止的行为；</span></p>
                <p><span style="font-size: 12pt;">（8）不得利用在本站注册的账户进行牟利性经营活动；</span></p>
                <p><span style="font-size: 12pt;">（9）不得发布任何侵犯他人著作权、商标权等知识产权或合法权利的内容；</span></p>
                <p><span style="font-size: 12pt;"><strong>用户应不时关注并遵守本站不时公布或修改的各类合法规则规定。</strong></span></p>
                <p><span style="font-size: 12pt;"><strong>本站保有删除站内各类不符合法律政策或不真实的信息内容而无须通知用户的权利。</strong></span></p>
                <p><span style="font-size: 12pt;"><strong>若用户未遵守以上规定的，本站有权作出独立判断并采取暂停或关闭用户帐号等措施。用户须对自己在网上的言论和行为承担法律责任。</strong></span>
                </p>
                <p><span style="font-size: 12pt;"><strong>五、商品信息</strong></span></p>
                <p><span style="font-size: 12pt;">本站上的商品价格、数量、是否有货等商品信息随时都有可能发生变动，本站不作特别通知。由于网站上商品信息的数量极其庞大，虽然本站会尽最大努力保证您所浏览商品信息的准确性，但由于众所周知的互联网技术因素等客观原因存在，本站网页显示的信息可能会有一定的滞后性或差错，对此情形您知悉并理解；有米拿欢迎纠错，并会视情况给予纠错者一定的奖励。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>为表述便利，商品和服务简称为</strong><strong>"</strong><strong>商品</strong><strong>"</strong><strong>或</strong><strong>"</strong><strong>货物</strong><strong>"</strong><strong>。</strong></span>
                </p>
                <p><span style="font-size: 12pt;"><strong>六、订单</strong></span></p>
                <p><span style="font-size: 12pt;">6.1在您下订单时，请您仔细确认所购商品的名称、价格、数量、型号、规格、尺寸、联系地址、电话、收货人等信息。收货人与用户本人不一致的，收货人的行为和意思表示视为用户的行为和意思表示，用户应对收货人的行为及意思表示的法律后果承担连带责任。</span>
                </p>
                <p><span style="font-size: 12pt;">6.2除法律另有强制性规定外，双方约定如下：本站上销售方展示的商品和价格等信息仅仅是交易信息的发布，您下单时须填写您希望购买的商品数量、价款及支付方式、收货人、联系方式、收货地址等内容；系统生成的订单信息是计算机信息系统根据您填写的内容自动生成的数据，仅是您向销售方发出的交易诉求；销售方收到您的订单信息后，只有在销售方将您在订单中订购的商品从仓库实际直接向您发出时（以商品出库为标志），方视为您与销售方之间就实际直接向您发出的商品建立了交易关系；如果您在一份订单里订购了多种商品并且销售方只给您发出了部分商品时，您与销售方之间仅就实际直接向您发出的商品建立了交易关系；只有在销售方实际直接向您发出了订单中订购的其他商品时，您和销售方之间就订单中该其他已实际直接向您发出的商品才成立交易关系。您可以随时登录您在本站注册的账户，查询您的订单状态。</span>
                </p>
                <p><span style="font-size: 12pt;">6.3由于市场变化及各种以合理商业努力难以控制的因素的影响，本站无法保证您提交的订单信息中希望购买的商品都会有货；如您拟购买的商品，发生缺货，您有权取消订单。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>七、配送</strong></span></p>
                <p><span style="font-size: 12pt;">7.1销售方将会把商品（货物）送到您所指定的收货地址，所有在本站上列出的送货时间为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基础上估计得出的。</span>
                </p>
                <p><span style="font-size: 12pt;">7.2因如下情况造成订单延迟或无法配送等，销售方不承担延迟配送的责任：</span></p>
                <p><span style="font-size: 12pt;">（1）用户提供的信息错误、地址不详细等原因导致的；</span></p>
                <p><span style="font-size: 12pt;">（2）货物送达后无人签收，导致无法配送或延迟配送的；</span></p>
                <p><span style="font-size: 12pt;">（3）情势变更因素导致的；</span></p>
                <p><span style="font-size: 12pt;">（4）不可抗力因素导致的，例如：自然灾害、交通戒严、突发战争等。</span></p>
                <p><span style="font-size: 12pt;"><strong>八、所有权及知识产权条款</strong></span></p>
                <p><span style="font-size: 12pt;">8.1用户一旦接受本协议，即表明该用户主动将其在任何时间段在本站发表的任何形式的信息内容（包括但不限于客户评价、客户咨询、各类话题文章等信息内容）的财产性权利等任何可转让的权利，如著作权财产权（包括并不限于：复制权、发行权、出租权、展览权、表演权、放映权、广播权、信息网络传播权、摄制权、改编权、翻译权、汇编权以及应当由著作权人享有的其他可转让权利），全部独家且不可撤销地转让给有米拿所有，用户同意有米拿有权就任何主体侵权而单独提起诉讼。</span>
                </p>
                <p><span style="font-size: 12pt;">8.2本协议已经构成《中华人民共和国著作权法》第二十五条（条文序号依照2011年版著作权法确定）及相关法律规定的著作财产权等权利转让书面协议，其效力及于用户在有米拿上发布的任何受著作权法保护的作品内容，无论该等内容形成于本协议订立前还是本协议订立后。</span>
                </p>
                <p><span style="font-size: 12pt;">8.3用户同意并已充分了解本协议的条款，承诺不将已发表于本站的信息，以任何形式发布或授权其它主体以任何方式使用（包括但不限于在各类网站、媒体上使用）。</span>
                </p>
                <p><span style="font-size: 12pt;">8.4有米拿是本站的制作者,拥有此网站内容及资源的著作权等合法权利,受国家法律保护,有权不时地对本协议及本站的内容进行修改，并在本站张贴，无须另行通知用户。在法律允许的最大限度范围内，有米拿对本协议及本站内容拥有解释权。</span>
                </p>
                <p><span style="font-size: 12pt;">8.5除法律另有强制性规定外，未经有米拿明确的特别书面许可,任何单位或个人不得以任何方式非法地全部或部分复制、转载、引用、链接、抓取或以其他方式使用本站的信息内容，否则，有米拿有权追究其法律责任。</span>
                </p>
                <p><span style="font-size: 12pt;">8.6本站所刊登的资料信息（诸如文字、图表、标识、按钮图标、图像、声音文件片段、数字下载、数据编辑和软件），均是有米拿或其内容提供者的财产，受中国和国际版权法的保护。本站上所有内容的汇编是有米拿的排他财产，受中国和国际版权法的保护。本站上所有软件都是有米拿或其关联公司或其软件供应商的财产，受中国和国际版权法的保护。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>九、责任限制及不承诺担保</strong></span></p>
                <p><span style="font-size: 12pt;">9.1除非另有明确的书面说明,本站及其所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品（包括软件）和服务，均是在"按现状"和"按现有"的基础上提供的。</span>
                </p>
                <p><span style="font-size: 12pt;">9.2除非另有明确的书面说明,有米拿不对本站的运营及其包含在本网站上的信息、内容、材料、产品（包括软件）或服务作任何形式的、明示或默示的声明或担保（根据中华人民共和国法律另有规定的以外）。</span>
                </p>
                <p><span style="font-size: 12pt;">9.3有米拿不担保本站所包含的或以其它方式通过本站提供给您的全部信息、内容、材料、产品（包括软件）和服务、其服务器或从本站发出的电子信件、信息没有病毒或其他有害成分。</span>
                </p>
                <p><span style="font-size: 12pt;">9.4如因不可抗力或其它本站无法控制的原因使本站销售系统崩溃或无法正常使用导致网上交易无法完成或丢失有关的信息、记录等，有米拿会合理地尽力协助处理善后事宜。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>十、协议更新及用户关注义务</strong></span></p>
                <p><span style="font-size: 12pt;">根据国家法律法规变化及网站运营需要，有米拿有权对本协议条款不时地进行修改，修改后的协议一旦被张贴在本站上即生效，并代替原来的协议。用户可随时登录查阅最新协议；&nbsp;<strong><em>用户有义务不时关注并阅读最新版的协议及网站公告。如用户不同意更新后的协议，可以且应立即停止接受有米拿依据本协议提供的服务；如用户继续使用本网站提供的服务的，即视为同意更新后的协议。有米拿建议您在使用本站之前阅读本协议及本站的公告。</em></strong><strong>&nbsp;</strong>如果本协议中任何一条被视为废止、无效或因任何理由不可执行，该条应视为可分的且并不影响任何其余条款的有效性和可执行性。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>十一、法律管辖和适用</strong></span></p>
                <p><span style="font-size: 12pt;">本协议的订立、执行和解释及争议的解决均应适用在中华人民共和国大陆地区适用之有效法律（但不包括其冲突法规则）。如发生本协议与适用之法律相抵触时，则这些条款将完全按法律规定重新解释，而其它有效条款继续有效。如缔约方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向有管辖权的中华人民共和国大陆地区法院提起诉讼。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>十二、其他</strong></span></p>
                <p><span style="font-size: 12pt;">12.1有米拿所有者是指在政府部门依法许可或备案的有米拿经营主体。</span></p>
                <p><span style="font-size: 12pt;">12.2有米拿尊重用户和消费者的合法权利，本协议及本网站上发布的各类规则、声明等其他内容，均是为了更好的、更加便利的为用户和消费者提供服务。本站欢迎用户和社会各界提出意见和建议，有米拿将虚心接受并适时修改本协议及本站上的各类规则。</span>
                </p>
                <p><span style="font-size: 12pt;">12.3本协议内容中以黑体、加粗、下划线、斜体等方式显著标识的条款，请用户着重阅读。</span></p>
                <p><span style="font-size: 12pt;">12.4您点击本协议下方的"同意并继续"按钮即视为您完全接受本协议，在点击之前请您再次确认已知悉并完全理解本协议的全部内容。</span>
                </p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="helpCenterVisible1=false">关闭</el-button>
            </div>
        </el-dialog>  
        <el-dialog title="帮助中心" :visible.sync="helpCenterVisible2" :close-on-click-modal="false" class="helpCeterDialog" style="top:10%">
            <div class="layer_content">
                <p style="text-align: center;"><span style="font-size: 12pt;"><strong>有米拿礼品卡</strong></span></p>
                <p><span style="font-size: 12pt;">有米拿礼品卡是金划算公司发行的可在有米拿网站进行兑换业务的实体卡片。</span></p>
                <p><span style="font-size: 12pt;">有米拿礼品卡包含积分礼品卡和礼品兑换卡两大类：</span></p>
                <p><span style="font-size: 12pt;">1、积分礼品卡有100积分、300积分、500积分、1000积分四种面值，用户可根据需求购买不同面值的积分卡。用户在购买积分礼品卡后在有米拿网站兑换成相应的积分购买商品。</span>
                </p>
                <p><span style="font-size: 12pt;">2、礼品兑换卡是有米拿面对公司客户提供的个性化定制服务的实体卡片。公司客户指定商品后，公司员工持卡在有米拿网站激活后直接兑换指定商品，然后由有米拿快递至用户指定的地址。</span>
                </p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="helpCenterVisible2=false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="帮助中心" :visible.sync="helpCenterVisible3" :close-on-click-modal="false" class="helpCeterDialog" style="top:10%">
            <div class="layer_content">
                <p style="text-align: center;"><span style="font-size: 12pt;"><strong>积分充值条款</strong></span></p>
                <p><span style="font-size: 12pt;">欢迎您使用有米拿的服务！</span><br><span style="font-size: 12pt;"> 　　为使用有米拿的服务，您应当阅读并遵守《有米拿服务协议》（以下简称:本协议）。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、管辖与法律适用条款，以及开通或使用某项服务的单独协议。限制、免责条款可能以黑体加粗或加下划线的形式提示您重点注意。除非您已阅读并接受本协议所有条款，否则您无权使用有米拿提供的服务。您使用有米拿的服务即视为您已阅读并同意上述协议的约束。</span><br><span style="font-size: 12pt;"> 　　<strong>如果您未满</strong><strong>18</strong><strong>周岁，请在法定监护人的陪同下阅读本协议，并特别注意未成年人使用条款。</strong></span>
                </p>
                <p><span style="font-size: 12pt;"><strong>　　一、【协议的范围】</strong></span><br><span style="font-size: 12pt;"> 　　1.1本协议是您与有米拿网站（以下简称：有米拿）所有者金划算科技股份有限公司（以下简称:金划算公司）之间关于用户使用有米拿相关服务所订立的协议。有米拿是指金划算公司及其相关服务可能存在的运营关联单位。用户是指使用有米拿相关服务的使用人，在本协议中更多地称为:您。</span><br><span style="font-size: 12pt;"> 　　1.2本协议项下的服务是指有米拿向用户提供的包括但不限于即时通讯、网络媒体、互联网增值、互动娱乐、电子商务和广告等产品及服务（以下简称:本服务）。</span><br><span style="font-size: 12pt;"> 　　1.3本协议内容您在使用有米拿某一特定服务时，该服务可能会另有单独的协议、相关业务规则等（以下统称为:单独协议）。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。您对前述任何业务规则、单独协议的接受，即视为您对本协议全部的接受。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>　　二、【帐号与密码安全】</strong></span><br><span style="font-size: 12pt;"> 　　2.1您在使用有米拿的服务时需要注册一个帐号。关于您使用帐号的具体规则，请遵守《有米拿注册协议》和单独协议。</span><br><span style="font-size: 12pt;"> 　　2.2有米拿特别提醒您应妥善保管您的帐号和密码。当您使用完毕后，应安全退出。因您保管不善可能导致遭受盗号或密码失窃，责任由您自行承担。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>&nbsp; &nbsp; &nbsp; &nbsp;三、【用户个人信息保护】</strong></span><br><span style="font-size: 12pt;"> 　　3.1保护用户个人信息是有米拿的一项基本原则。有米拿将按照本协议及《有米拿注册协议》的规定收集、使用、储存和分享您的个人信息。本协议对个人信息保护规定的内容与上述《隐私政策》有相冲突的，及本协议对个人信息保护相关内容未作明确规定的，均应以《隐私政策》的内容为准。</span><br><span style="font-size: 12pt;"> 　　3.2您在注册帐号或使用本服务的过程中，可能需要填写一些必要的信息。若国家法律法规有特殊规定的，您需要填写真实的身份信息。若您填写的信息不完整，则无法使用本服务或在使用过程中受到限制。</span><br><span style="font-size: 12pt;"> 　　3.3一般情况下，您可随时浏览、修改自己提交的信息，但出于安全性和身份识别（如号码申诉服务）的考虑，您可能无法修改注册时提供的初始注册信息及其他验证信息。</span><br><span style="font-size: 12pt;"> 　　3.4有米拿将运用各种安全技术和程序建立完善的管理制度来保护您的个人信息，以免遭受未经授权的访问、使用或披露。</span><br><span style="font-size: 12pt;"> 　　3.5有米拿不会将您的个人信息转移或披露给任何非关联的第三方，除非：</span><br><span style="font-size: 12pt;"> 　　（1）相关法律法规或法院、政府机关要求；</span><br><span style="font-size: 12pt;"> 　　（2）为完成合并、分立、收购或资产转让而转移；或</span><br><span style="font-size: 12pt;"> 　　（3）为提供您要求的服务所必需。</span><br><span style="font-size: 12pt;"> 　　3.6有米拿非常重视对未成年人个人信息的保护。若您是18周岁以下的未成年人，在使用有米拿的服务前，应事先取得您家长或法定监护人（以下简称"监护人"）的书面同意。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>　　四、【使用本服务的方式】</strong></span><br><span style="font-size: 12pt;"> 　　4.1除非您与有米拿另有约定，您同意本服务仅为您个人非商业性质的使用。</span><br><span style="font-size: 12pt;"> 　　4.2您应当通过有米拿提供或认可的方式使用本服务。您依本协议条款所取得的权利不可转让。</span><br><span style="font-size: 12pt;"> 　　4.3您不得使用未经有米拿授权的插件、外挂或第三方工具对本协议项下的服务进行干扰、破坏、修改或施加其他影响。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>　　五、【按现状提供服务】</strong></span><br><span style="font-size: 12pt;"> 您理解并同意，有米拿的服务是按照现有技术和条件所能达到的现状提供的。有米拿会尽最大努力向您提供服务，确保服务的连贯性和安全性；但有米拿不能随时预见和防范法律、技术以及其他风险，包括但不限于不可抗力、病毒、木马、黑客攻击、系统不稳定、第三方服务瑕疵、政府行为等原因可能导致的服务中断、数据丢失以及其他的损失和风险。</span>
                </p>
                <p><span style="font-size: 12pt;">　<strong>　六、【自备设备】</strong></span><br><span style="font-size: 12pt;"> 　　6.1您应当理解，您使用有米拿的服务需自行准备与相关服务有关的终端设备（如电脑、调制解调器等装置），并承担所需的费用（如电话费、上网费等费用）。</span><br><span style="font-size: 12pt;"> 　　6.2您理解并同意，您使用本服务时会耗用您的终端设备和带宽等资源。</span></p>
                <p><span style="font-size: 12pt;"><strong>　　七、【广告】</strong></span><br><span style="font-size: 12pt;"> 　　7.1您同意有米拿可以在提供服务的过程中自行或由第三方广告商向您发送广告、推广或宣传信息（包括商业与非商业信息），其方式和范围可不经向您特别通知而变更。</span><br><span style="font-size: 12pt;"> 　　7.2有米拿可能为您提供选择关闭广告信息的功能，但任何时候您都不得以本协议未明确约定或有米拿未书面许可的方式屏蔽、过滤广告信息。</span><br><span style="font-size: 12pt;"> 　　7.3有米拿依照法律的规定对广告商履行相关义务，您应当自行判断广告信息的真实性并为自己的判断行为负责，除法律明确规定外，您因依该广告信息进行的交易或前述广告商提供的内容而遭受的损失或损害，有米拿不承担责任。</span><br><span style="font-size: 12pt;"> 　　7.4您同意，对有米拿服务中出现的广告信息，您应审慎判断其真实性和可靠性，除法律明确规定外，您应对依该广告信息进行的交易负责。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>　　八、【收费服务】</strong></span><br><span style="font-size: 12pt;"> 　　8.1有米拿的部分服务是以收费方式提供的，如您使用收费服务，请遵守相关的协议。</span><br><span style="font-size: 12pt;"> 　　8.2有米拿可能根据实际需要对收费服务的收费标准、方式进行修改和变更，有米拿也可能会对部分免费服务开始收费。前述修改、变更或开始收费前，有米拿将在相应服务页面进行通知或公告。如果您不同意上述修改、变更或付费内容，则应停止使用该服务。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>　　九、【第三方提供的产品或服务】</strong></span><br><span style="font-size: 12pt;"> 您在有米拿平台上使用第三方提供的产品或服务时，除遵守本协议约定外，还应遵守第三方的用户协议。有米拿和第三方对可能出现的纠纷在法律规定和约定的范围内各自承担责任。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>　　十、【基于软件提供服务】</strong></span></p>
                <p><span style="font-size: 12pt;">若有米拿依托&amp;ldquo;软件&amp;rdquo;向您提供服务，您还应遵守以下约定：</span><br><span style="font-size: 12pt;"> 10.1您在使用本服务的过程中可能需要下载软件，对于这些软件，有米拿给予您一项个人的、不可转让及非排他性的许可。您仅可为访问或使用本服务的目的而使用这些软件。</span><br><span style="font-size: 12pt;"> 10.2为了改善用户体验、保证服务的安全性及产品功能的一致性，有米拿可能会对软件进行更新。您应该将相关软件更新到最新版本，否则有米拿并不保证其能正常使用。</span>
                </p>
                <p><span style="font-size: 12pt;">10.3有米拿可能为不同的终端设备开发不同的软件版本，您应当根据实际情况选择下载合适的版本进行安装。您可以直接从有米拿的网站上获取软件，也可以从得到有米拿授权的第三方获取。如果您从未经有米拿授权的第三方获取软件或与软件名称相同的安装程序，有米拿无法保证该软件能够正常使用，并对因此给您造成的损失不予负责。</span>
                </p>
                <p><span style="font-size: 12pt;">10.4除非有米拿书面许可，您不得从事下列任一行为：&nbsp;<br> （1）删除软件及其副本上关于著作权的信息；&nbsp;</span><br><span style="font-size: 12pt;"> （2）对软件进行反向工程、反向汇编、反向编译，或者以其他方式尝试发现软件的源代码；&nbsp;</span><br><span style="font-size: 12pt;"> （3）对有米拿拥有知识产权的内容进行使用、出租、出借、复制、修改、链接、转载、汇编、发表、出版、建立镜像站点等；&nbsp;</span><br><span style="font-size: 12pt;"> （4）对软件或者软件运行过程中释放到任何终端内存中的数据、软件运行过程中客户端与服务器端的交互数据，以及软件运行所必需的系统数据，进行复制、修改、增加、删除、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或非经有米拿授权的第三方工具/服务接入软件和相关系统；&nbsp;</span><br><span style="font-size: 12pt;"> （5）通过修改或伪造软件运行中的指令、数据，增加、删减、变动软件的功能或运行效果，或者将用于上述用途的软件、方法进行运营或向公众传播，无论这些行为是否为商业目的；&nbsp;</span><br><span style="font-size: 12pt;"> （6）通过非有米拿开发、授权的第三方软件、插件、外挂、系统，登录或使用有米拿软件及服务，或制作、发布、传播非有米拿开发、授权的第三方软件、插件、外挂、系统。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>　　十一、【知识产权声明】</strong></span><br><span style="font-size: 12pt;"> 　　11.1有米拿在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权归有米拿所有，用户在使用本服务中所产生的内容的知识产权归用户或相关权利人所有。</span><br><span style="font-size: 12pt;"> 　　11.2除另有特别声明外，有米拿提供本服务时所依托软件的著作权、专利权及其他知识产权均归有米拿所有。</span><br><span style="font-size: 12pt;"> 　　11.3有米拿在本服务中所使用的&amp;ldquo;有米拿&amp;rdquo;、&amp;ldquo;越洋拿&amp;rdquo;及有米拿形象等商业标识，其著作权或商标权归有米拿所有。</span><br><span style="font-size: 12pt;"> 　　11.4上述及其他任何本服务包含的内容的知识产权均受到法律保护，未经有米拿、用户或相关权利人书面许可，任何人不得以任何形式进行使用或创造相关衍生作品。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>&nbsp; &nbsp; &nbsp; &nbsp;十二、【用户违法行为】</strong></span><br><span style="font-size: 12pt;"> 　　12.1您在使用本服务时须遵守法律法规，不得利用本服务从事违法违规行为，包括但不限于：</span><br><span style="font-size: 12pt;"> 　　（1）发布、传送、传播、储存危害国家安全统一、破坏社会稳定、违反公序良俗、侮辱、诽谤、淫秽、暴力以及任何违反国家法律法规的内容；</span><br><span style="font-size: 12pt;"> 　　（2）发布、传送、传播、储存侵害他人知识产权、商业秘密等合法权利的内容；</span><br><span style="font-size: 12pt;"> 　　（3）恶意虚构事实、隐瞒真相以误导、欺骗他人；</span><br><span style="font-size: 12pt;"> 　　（4）发布、传送、传播广告信息及垃圾信息；</span><br><span style="font-size: 12pt;"> 　　（5）其他法律法规禁止的行为。</span><br><span style="font-size: 12pt;"> 　　12.2如果您违反了本条约定，相关国家机关或机构可能会对您提起诉讼、罚款或采取其他制裁措施，并要求有米拿给予协助。造成损害的，您应依法予以赔偿，有米拿不承担任何责任。</span><br><span style="font-size: 12pt;"> 　　12.3如果有米拿发现或收到他人举报您发布的信息违反本条约定，有米拿有权进行独立判断并采取技术手段予以删除、屏蔽或断开链接。同时，有米拿有权视用户的行为性质，采取包括但不限于暂停或终止服务，限制、冻结或终止有米拿账号使用，追究法律责任等措施。</span><br><span style="font-size: 12pt;"> 　　12.4您违反本条约定，导致任何第三方损害的，您应当独立承担责任；有米拿因此遭受损失的，您也应当一并赔偿。</span></p>
                <p><span style="font-size: 12pt;"><strong>　　十三、【遵守当地法律监管】</strong></span><br><span style="font-size: 12pt;"> 　　13.1您在使用本服务过程中应当遵守当地相关的法律法规，并尊重当地的道德和风俗习惯。如果您的行为违反了当地法律法规或道德风俗，您应当为此独立承担责任。</span><br><span style="font-size: 12pt;"> 　　13.2您应避免因使用本服务而使有米拿卷入政治和公共事件，否则有米拿有权暂停或终止对您的服务。</span></p>
                <p><span style="font-size: 12pt;"><strong>　　十四、【用户发送、传播的内容与第三方投诉处理】</strong></span><br><span style="font-size: 12pt;"> 　　14.1您通过本服务发送或传播的内容（包括但不限于网页、文字、图片、音频、视频、图表等）均由您自行承担责任。</span><br><span style="font-size: 12pt;"> 　　14.2您发送或传播的内容应有合法来源，相关内容为您所有或您已获得权利人的授权。</span><br><span style="font-size: 12pt;"> 　　14.3您同意有米拿可为履行本协议或提供本服务的目的而使用您发送或传播的内容。</span><br><span style="font-size: 12pt;"> 　　14.4如果有米拿收到权利人通知，主张您发送或传播的内容侵犯其相关权利的，您同意有米拿有权进行独立判断并采取删除、屏蔽或断开链接等措施。&nbsp;</span><br><span style="font-size: 12pt;"> 　　14.5您使用本服务时不得违反国家法律法规、侵害他人合法权益。您理解并同意，如您被他人投诉侵权或您投诉他人侵权，有米拿有权将争议中相关方的主体、联系方式、投诉相关内容等必要信息提供给其他争议方或相关部门，以便及时解决投诉纠纷，保护他人合法权益。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>十五、【不可抗力及其他免责事由】</strong></span><br><span style="font-size: 12pt;"> 　　15.1您理解并同意，在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，有米拿将努力在第一时间与相关单位配合，及时进行修复，但是由此给您造成的损失有米拿在法律允许的范围内免责。</span><br><span style="font-size: 12pt;"> 　　15.2在法律允许的范围内，有米拿对以下情形导致的服务中断或受阻不承担责任：</span><br><span style="font-size: 12pt;"> 　　（1）受到计算机病毒、木马或其他恶意程序、黑客攻击的破坏；</span><br><span style="font-size: 12pt;"> 　　（2）用户或有米拿的电脑软件、系统、硬件和通信线路出现故障；</span><br><span style="font-size: 12pt;"> 　　（3）用户操作不当；</span><br><span style="font-size: 12pt;"> 　　（4）用户通过非有米拿授权的方式使用本服务；</span><br><span style="font-size: 12pt;"> 　　（5）其他有米拿无法控制或合理预见的情形。</span><br><span style="font-size: 12pt;"> 　　15.3您理解并同意，在使用本服务的过程中，可能会遇到网络信息或其他用户行为带来的风险，有米拿不对任何信息的真实性、适用性、合法性承担责任，也不对因侵权行为给您造成的损害负责。这些风险包括但不限于：</span><br><span style="font-size: 12pt;"> 　　（1）来自他人匿名或冒名的含有威胁、诽谤、令人反感或非法内容的信息；</span><br><span style="font-size: 12pt;"> 　　（2）因使用本协议项下的服务，遭受他人误导、欺骗或其他导致或可能导致的任何心理、生理上的伤害以及经济上的损失；</span>
                </p>
                <p><span style="font-size: 12pt;">（3）其他因网络信息或用户行为引起的风险。</span><br><span style="font-size: 12pt;"> 　　15.4您理解并同意，本服务并非为某些特定目的而设计，包括但不限于核设施、军事用途、医疗设施、交通通讯等重要领域。如果因为软件或服务的原因导致上述操作失败而带来的人员伤亡、财产损失和环境破坏等，有米拿不承担法律责任。</span><br><span style="font-size: 12pt;"> 　　15.5有米拿依据本协议约定获得处理违法违规内容的权利，该权利不构成有米拿的义务或承诺，有米拿不能保证及时发现违法行为或进行相应处理。</span><br><span style="font-size: 12pt;"> 　　15.6在任何情况下，您不应轻信借款、索要密码或其他涉及财产的网络信息。涉及财产操作的，请一定先核实对方身份，并请经常留意有米拿有关防范诈骗犯罪的提示。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>　　十六、【协议的生效与变更】</strong></span><br><span style="font-size: 12pt;"> 　　16.1您使用有米拿的服务即视为您已阅读本协议并接受本协议的约束。</span><br><span style="font-size: 12pt;"> 　　16.2有米拿有权在必要时修改本协议条款。您可以在相关服务页面查阅最新版本的协议条款。</span><br><span style="font-size: 12pt;"> 　　16.3本协议条款变更后，如果您继续使用有米拿提供的软件或服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用有米拿提供的软件或服务。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>&nbsp; &nbsp; &nbsp; &nbsp;十七、【服务的变更、中断、终止】</strong></span><br><span style="font-size: 12pt;"> 　　17.1有米拿可能会对服务内容进行变更，也可能会中断、中止或终止服务。</span><br><span style="font-size: 12pt;"> 　　17.2您理解并同意，有米拿有权自主决定经营策略。在有米拿发生合并、分立、收购、资产转让时，有米拿可向第三方转让本服务下相关资产；有米拿也可在单方通知您后，将本协议下部分或全部服务转交由第三方运营或履行。具体受让主体以有米拿通知的为准。</span><br><span style="font-size: 12pt;"> 　　17.3如发生下列任何一种情形，有米拿有权不经通知而中断或终止向您提供的服务：</span><br><span style="font-size: 12pt;"> 　　（1）根据法律规定您应提交真实信息，而您提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明；</span><br><span style="font-size: 12pt;"> 　　（2）您违反相关法律法规或本协议的约定；</span><br><span style="font-size: 12pt;"> 　　（3）按照法律规定或主管部门的要求；</span><br><span style="font-size: 12pt;"> 　　（4）出于安全的原因或其他必要的情形。</span><br><span style="font-size: 12pt;"> 　　17.4有米拿有权按本协议8.2条的约定进行收费。若您未按时足额付费，有米拿有权中断、中止或终止提供服务。</span><br><span style="font-size: 12pt;"> 　　17.5您有责任自行备份存储在本服务中的数据。如果您的服务被终止，有米拿可以从服务器上永久地删除您的数据,但法律法规另有规定的除外。服务终止后，有米拿没有义务向您返还数据。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>　　十八、【管辖与法律适用】</strong></span><br><span style="font-size: 12pt;"> 　　18.1本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。</span><br><span style="font-size: 12pt;"> 　　18.2本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。</span><br><span style="font-size: 12pt;"> 　　18.3本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。</span></p>
                <p><span style="font-size: 12pt;"><strong>&nbsp; &nbsp; &nbsp; &nbsp;十九、【未成年人使用条款】</strong></span><br><span style="font-size: 12pt;"> 　　19.1若用户未满18周岁，则为未成年人，应在监护人监护、指导下阅读本协议和使用本服务。</span><br><span style="font-size: 12pt;"> 　　19.2未成年人用户涉世未深，容易被网络虚象迷惑，且好奇心强，遇事缺乏随机应变的处理能力，很容易被别有用心的人利用而又缺乏自我保护能力。因此，未成年人用户在使用本服务时应注意以下事项，提高安全意识，加强自我保护：</span><br><span style="font-size: 12pt;"> 　　（1）认清网络世界与现实世界的区别，避免沉迷于网络，影响日常的学习生活；</span><br><span style="font-size: 12pt;"> 　　（2）填写个人资料时，加强个人保护意识，以免不良分子对个人生活造成骚扰；</span><br><span style="font-size: 12pt;"> 　　（3）在监护人或老师的指导下，学习正确使用网络；</span></p>
                <p><span style="font-size: 12pt;">（4）避免陌生网友随意会面或参与联谊活动，以免不法分子有机可乘，危及自身安全。</span><br><span style="font-size: 12pt;"> 　　19.3监护人、学校均应对未成年人使用本服务时多做引导。特别是家长应关心子女的成长，注意与子女的沟通，指导子女上网应该注意的安全问题，防患于未然。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>　　二十、【其他】</strong></span><br><span style="font-size: 12pt;"> 如果您对本协议或本服务有意见或建议，可与有米拿客户服务部门联系（www.youmina.com），我们会给予您必要的帮助。</span>
                </p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="helpCenterVisible3=false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="帮助中心" :visible.sync="helpCenterVisible4" :close-on-click-modal="false" class="helpCeterDialog" style="top:10%">
            <div class="layer_content">
                <p style="text-align: center;"><span style="font-size: 12pt;"><strong>积分使用规则</strong></span></p>
                <p><span style="font-size: 12pt;"><strong>1.</strong><strong>什么是积分？</strong></span></p>
                <p><span style="font-size: 12pt;">积分是用户使用有米拿网站各种增值服务的种类、数量或时间等的一种统计代码，并非任何代币票券，不能用于使用有米拿网站增值服务以外的任何商品或服务。积分的有效期为一年，即从获得积分开始至次年同日。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>2.</strong><strong>积分有什么用？</strong></span></p>
                <p><span style="font-size: 12pt;">用户可以使用积分购买有米拿和越洋拿（网站、客户端）提供的等值商品、服务等。</span></p>
                <p><span style="font-size: 12pt;"><strong>3.</strong><strong>积分如何获得？</strong></span></p>
                <p><span style="font-size: 12pt;">用户可以通过有米拿网站进行充值或者使用积分礼品卡进行兑换和使用有米拿的用户米粒兑换等。</span></p>
                <p><span style="font-size: 12pt;"><strong>4.</strong><strong>积分如何查询？</strong></span></p>
                <p><span style="font-size: 12pt;">用户可以通过“个人中心-我的积分”进行在线查询积分变动情况。</span></p>
                <p><span style="font-size: 12pt;">&nbsp;</span></p>
                <p><span style="font-size: 12pt;">&nbsp;</span></p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="helpCenterVisible4=false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="帮助中心" :visible.sync="helpCenterVisible5" :close-on-click-modal="false" class="helpCeterDialog" style="top:10%">
            <div class="layer_content">
                <p style="text-align: center;"><span style="font-size: 12pt;"><strong>常见问题</strong></span></p>
                <p style="text-align: left;"><span style="font-size: 12pt;"><strong>1.什么是礼品卡？</strong></span></p>
                <p><span style="font-size: 12pt;">礼品卡是有米拿推出的面对企业和个人的积分礼品卡与礼品兑换卡。积分礼品卡是可以用来兑换有米拿商城积分的实体卡，礼品兑换卡是可以在有米拿商城兑换定制的相应礼品的实体卡。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>2</strong>.<strong>如何使用礼品卡？</strong></span></p>
                <p><span style="font-size: 12pt;">用户可以在有米拿网站（www.youmina.com）首页点击“礼品卡激活”，把积分礼品卡兑换成相应的积分或者直接兑换商品，然后在购买商品时选择使用积分支付即可使用积分礼品卡。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>3.礼品卡有效期是多久？</strong></span></p>
                <p><span style="font-size: 12pt;">有米拿礼品卡的有效期为一年，即从购买日起至次年同日。</span></p>
                <p><span style="font-size: 12pt;"><strong>4.礼品卡可以提供个性化定制服务吗？</strong></span></p>
                <p><span style="font-size: 12pt;">有米拿礼品卡可以根据用户需要提供面值、图案等个性化的定制服务。</span></p>
                <p><span style="font-size: 12pt;"><strong>5</strong>.<strong>如何购买礼品卡？</strong></span></p>
                <p><span style="font-size: 12pt;">用户可以拨打400-895-6699客服热线购买礼品卡。</span></p>
                <p><span style="font-size: 12pt;"><strong>6.订单已经提交成功，可以改送到其他地方吗？</strong></span></p>
                <p><span style="font-size: 12pt;">订单一旦提交成功，将无法修改。请在提交订单前仔细检查核对。</span></p>
                <p><span style="font-size: 12pt;"><strong>7.签收时发现商品包装破损，该如何处理？</strong></span></p>
                <p><span style="font-size: 12pt;">您好，一旦商品包装出现破损，请咨询下配送师傅是否可以查看商品是否完好，如商品完好，请您放心签收，如商品破损，请您拒收商品，如已签收，可以马上联系我们或提交售后服务单，我们会尽快为您处理。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>8.订单已提交成功，如何付款？</strong></span></p>
                <p><span style="font-size: 12pt;">您可以选择使用有米拿积分进行支付；</span></p>
                <p><span style="font-size: 12pt;"><strong>9.我购买了有米拿的商品，我想知道用的是什么快递给我配送的？</strong></span></p>
                <p><span style="font-size: 12pt;">您好，有米拿暂不支持指定快递，具体发货快递会根据您所在的区域系统自动分配，具体待订单发货之后可以在订单里面查看到。如您有特殊需求，可以联系有米拿客服协商发货快递。感谢您的理解。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>10</strong>.<strong>我购买了商品需要支付运费吗？</strong></span></p>
                <p><span style="font-size: 12pt;">您好，有米拿所有商品购买都是不需要额外支付运费的。</span></p>
                <p><span style="font-size: 12pt;"><strong>11.网站上显示商品无货，请问什么时候可以再到货？</strong></span></p>
                <p><span style="font-size: 12pt;">一般补货时间是7-15个工作日，具体还是以网站信息为准。</span></p>
                <p><span style="font-size: 12pt;"><strong>12.如何取消订单？</strong></span></p>
                <p><span style="font-size: 12pt;">您可以进入“用户中心-我的订单”自行操作订单取消，如订单已进入配送环节不确保能够取消订单，配送上门时还请您拒收。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>13.订单已提交成功，什么时候可以发货？</strong></span></p>
                <p><span style="font-size: 12pt;">订单提交成功后我们会尽快安排发货，详细进度查询，您可以进入“用户中心-我的订单”实时查询订单进度。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>14.订单取消了，能不能恢复？</strong></span></p>
                <p><span style="font-size: 12pt;">非常抱歉，订单一单取消将无法恢复，建议您重新下单购买。</span></p>
                <p><span style="font-size: 12pt;"><strong>15.我想办理退换货如何操作？</strong></span></p>
                <p><span style="font-size: 12pt;">有米拿为您提供了自助申请退换货的服务，登录后您可在“用户中心-我的订单”点击“申请售后”自助完成退换货的申请。</span>
                </p>
                <p><span style="font-size: 12pt;">&nbsp;</span></p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="helpCenterVisible5=false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="帮助中心" :visible.sync="helpCenterVisible6" :close-on-click-modal="false" class="helpCeterDialog" style="top:10%">
            <div class="layer_content">
                <p style="text-align: center;"><span style="font-size: 12pt;"><strong>激活礼品卡流程</strong></span></p>
                <p><span style="font-size: 12pt;"><strong>积分礼品卡激活流程：</strong></span></p>
                <p><img src="../../assets/img/card-action.png" alt="" width="601" height="911"></p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="helpCenterVisible6=false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="帮助中心" :visible.sync="helpCenterVisible7" :close-on-click-modal="false" class="helpCeterDialog" style="top:10%">
            <div class="layer_content">
                <p style="text-align: center;"><span style="font-size: 12pt;"><strong>购物流程</strong></span></p>
                <p><span style="font-size: 12pt;"><strong>有米拿网站购物流程图：</strong></span></p>
                <p><img src="../../assets/img/shopping-step.png" alt="" width="601" height="628"></p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="helpCenterVisible7=false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="帮助中心" :visible.sync="helpCenterVisible8" :close-on-click-modal="false" class="helpCeterDialog" style="top:10%">
            <div class="layer_content">
                <p style="text-align: center;"><span style="font-size: 12pt;"><strong>登录流程</strong></span></p>
                <p><span style="font-size: 12pt;"><strong>有米拿网站登录流程图：</strong></span></p>
                <p><img src="../../assets/img/login-step.png" alt="" width="601" height="870"></p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="helpCenterVisible8=false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="帮助中心" :visible.sync="helpCenterVisible9" :close-on-click-modal="false" class="helpCeterDialog" style="top:10%">
            <div class="layer_content">
                <p style="text-align: center;"><span style="font-size: 12pt;"><strong>积分介绍</strong></span></p>
                <p><span style="font-size: 12pt;"><strong>1</strong><strong>、积分是什么？</strong></span></p>
                <p><span style="font-size: 12pt;">积分是用户使用有米拿网站各种增值服务的种类、数量或时间等的一种统计代码，并非任何代币票券，不能用于使用有米拿网站增值服务以外的任何商品或服务。积分的有效期为一年，即从获得积分开始至次年同日。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>2</strong><strong>、怎么获得积分？</strong></span></p>
                <p><span style="font-size: 12pt;">用户可以通过以下三种方式获得积分：</span></p>
                <p><span style="font-size: 12pt;">（1）有米拿网站进行充值；</span></p>
                <p><span style="font-size: 12pt;">（2）使用积分礼品卡进行兑换；</span></p>
                <p><span style="font-size: 12pt;">（3）企业用户给员工发放的福利积分。</span></p>
                <p><span style="font-size: 12pt;"><strong>3</strong><strong>、怎么使用积分？</strong></span></p>
                <p><span style="font-size: 12pt;">用户可以在有米拿和越洋拿（网站、客户端）购买等值商品或服务时选择使用有米拿积分付款结算。</span></p>
                <p><span style="font-size: 12pt;"><strong>4</strong><strong>、积分如何查询？</strong></span></p>
                <p><span style="font-size: 12pt;">用户可以通过“个人中心-我的积分”进行在线查询积分变动情况。</span></p>
                <p><span style="font-size: 12pt;">&nbsp;</span></p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="helpCenterVisible9=false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="帮助中心" :visible.sync="helpCenterVisible10" :close-on-click-modal="false" class="helpCeterDialog" style="top:10%">
            <div class="layer_content">
                <p style="text-align: center;"><span style="font-size: 12pt;"><strong>快递配送</strong></span></p>
                <p><span style="font-size: 12pt;"><strong>1</strong><strong>、配送方式</strong></span></p>
                <p><span style="font-size: 12pt;">有米拿网站是通过合作供应商配套的快递物流方式进行配送服务的。具体配送方式依不同商品而定。</span></p>
                <p><span style="font-size: 12pt;"><strong>2</strong><strong>、配送运费</strong></span></p>
                <p><span style="font-size: 12pt;">有米拿网站对于所有商品的配送服务都是免费的，不会向用户额外收取配送服务费。</span></p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="helpCenterVisible10=false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="帮助中心" :visible.sync="helpCenterVisible11" :close-on-click-modal="false" class="helpCeterDialog" style="top:10%">
            <div class="layer_content">
                <p style="text-align: center;"><span style="font-size: 12pt;"><strong>售后服务</strong></span></p>
                <p><span style="font-size: 12pt;">有米拿承诺符合以下情况，用户可400-895-6699联系有米拿客服人员办理退货申请事宜。具体退换货标准如下：</span></p>
                <p><span style="font-size: 12pt;">1、国家法律所规定的功能性故障或商品质量问题。经由生产厂家指定或特约售后服务中心检测确认，并出具检测报告或经有米拿售后确认属于商品质量问题；</span>
                </p>
                <p><span style="font-size: 12pt;">2、到货物流损、缺件或商品描述与网站不符等。物流损指在运输过程中造成的损坏、漏液、破碎、性能故障，经售后人员核查情况属实。缺件指商品原装配件缺失；</span>
                </p>
                <p><span style="font-size: 12pt;">3、其他原因。除以上两种原因之外，如个人原因导致的退换货，在商品完好的前提下；</span></p>
                <p><span style="font-size: 12pt;">4、根据法律规定及商品性质，以下商品不享受退货政策：</span></p>
                <p><span style="font-size: 12pt;">（1）用户定做类商品；</span></p>
                <p><span style="font-size: 12pt;">（2）鲜活易腐商品；</span></p>
                <p><span style="font-size: 12pt;">（3）在线下载或消费者拆封的音像制品、计算机软件等数字化商品；</span></p>
                <p><span style="font-size: 12pt;">（4）交付的报纸、期刊类商品；</span></p>
                <p><span style="font-size: 12pt;">（5）食用类商品，如食品、保健品、饮料、药品、酒类、奶粉、婴儿辅食等；</span></p>
                <p><span style="font-size: 12pt;">（6）贵重类商品，如钻石、贵金属、手表、珠宝、奢侈品等；</span></p>
                <p><span style="font-size: 12pt;">（7）个人护理、贴身类商品，如计生用品、美护、内衣、贴身裤袜等；</span></p>
                <p><span style="font-size: 12pt;">（8）虚拟类商品，如礼品卡、手机充值、游戏点卡等充值类商品，以及门票、机票、旅游套餐等一次性消费服务类商品等；</span></p>
                <p><span style="font-size: 12pt;">（9）特殊类商品，如运营商合约手机以及二手商品、处理品等；</span></p>
                <p><span style="font-size: 12pt;">（10）其他根据商品性质不宜退货的商品；</span></p>
                <p><span style="font-size: 12pt;">对于上述不享受退货政策的商品，有米拿会在相关商品页面给予您提示，并在您提交订单购买时请您确认。</span></p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="helpCenterVisible11=false">关闭</el-button>
            </div>
        </el-dialog>
        <el-dialog title="帮助中心" :visible.sync="helpCenterVisible12" :close-on-click-modal="false" class="helpCeterDialog" style="top:10%">
            <div class="layer_content">
                <p style="text-align: center;"><span style="font-size: 12pt;"><strong>特色服务</strong></span></p>
                <p><span style="font-size: 12pt;"><strong>一、越洋拿</strong></span></p>
                <p><span style="font-size: 12pt;">越洋拿·全球购是有米拿推出的跨境电子商务新业务，旨在为用户带来更优质更多选择的海外商品，让您足不出户购遍全球。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>越洋拿服务承诺：</strong></span></p>
                <p><span style="font-size: 12pt;"><strong>1.&nbsp;&nbsp;</strong>&nbsp;<strong>海外正品保证</strong></span>
                </p>
                <p><span style="font-size: 12pt;">越洋拿承诺出售均为100%海外原装正品，并承诺提供“正品保障服务”，一旦越洋拿被发现出售假货及非原装正品商品，越洋拿会立即对买家进行赔偿。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>2.&nbsp;&nbsp;</strong>&nbsp;<strong>全球直供</strong></span>
                </p>
                <p><span style="font-size: 12pt;">越洋拿选购商品均从海外或保税仓发至您手中，配送物流稳定可靠，比一般国际物流周期短。越洋拿所有商品均属海外生产或销售，所有商品均是从中国大陆以外的国家或地区发出，或从海关监管的中国保税区发出，进行100%阳光清关，物流信息全程可以查看。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>3.&nbsp;&nbsp;</strong>&nbsp;<strong>客服专线体验尊享</strong></span>
                </p>
                <p><span style="font-size: 12pt;">如果您有任何疑问，欢迎拨打越洋拿客户专线：021-54653958，服务时间：9:00-18:00，如您不方便致电，也可使用越洋拿在线咨询服务（越洋拿在线客服服务时间：9:00-18:00）！</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>4.&nbsp;&nbsp;</strong>&nbsp;<strong>越洋拿商品常见问题</strong></span>
                </p>
                <p><span style="font-size: 12pt;">Q1：越洋拿商品的购物流程是什么？</span></p>
                <p><span style="font-size: 12pt;">越洋拿购物流程：</span></p>
                <p><img src="../../assets/img/fahuo-step.jpg" alt="" width="448" height="148"></p>
                <p><span style="font-size: 12pt;">Q2：如何查找越洋拿商品？</span></p>
                <p><span style="font-size: 12pt;">通过【越洋拿首页】-进入【越洋拿】，越洋拿网址：http://www.yueyangna.com/</span></p>
                <p><span style="font-size: 12pt;">Q3：越洋拿商品和海外购商品有什么区别？</span></p>
                <p><span style="font-size: 12pt;">越洋拿商品均从海外或保税仓发至您手中，配送物流稳定可靠，比一般国际物流周期短。海外购商品是从国外采购并直接从国外直邮国内，需入关检测、国内物流送达客户等环节，到货周期相对较长。</span>
                </p>
                <p><span style="font-size: 12pt;"><strong>二、节日商品兑换专区</strong></span></p>
                <p><span style="font-size: 12pt;">节日商品兑换专区是有米拿专门为节假日推出的和节假日相关的主题活动专区。，用户可以快速兑换与节日主题相关的商品。</span></p>
                <p><span style="font-size: 12pt;"><strong>三、便民服务</strong></span></p>
                <p><span style="font-size: 12pt;">有米拿网站为用户提供一系列便民服务，如手机充值、缴纳水电煤、加油卡充值、宽带固话缴费、信用卡还款、有线电视缴费等。</span>
                </p>
                <p><span style="font-size: 12pt;">&nbsp;</span></p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="helpCenterVisible12=false">关闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default{
    data(){
        return{
            helpCenterVisible1:false,
            helpCenterVisible2:false,
            helpCenterVisible3:false,
            helpCenterVisible4:false,
            helpCenterVisible5:false,
            helpCenterVisible6:false,
            helpCenterVisible7:false,
            helpCenterVisible8:false,
            helpCenterVisible9:false,
            helpCenterVisible10:false,
            helpCenterVisible11:false,
            helpCenterVisible12:false
        }
    },
    methods:{
        seeDetails(int){
            if(int==1){
                this.helpCenterVisible1=true   
            }else if(int==2){
                this.helpCenterVisible2=true  
            }else if(int==3){
                this.helpCenterVisible3=true  
            }else if(int==4){
                this.helpCenterVisible4=true  
            }else if(int==5){
                this.helpCenterVisible5=true  
            }else if(int==6){
                this.helpCenterVisible6=true  
            }else if(int==7){
                this.helpCenterVisible7=true  
            }else if(int==8){
                this.helpCenterVisible8=true  
            }else if(int==9){
                this.helpCenterVisible9=true  
            }else if(int==10){
                this.helpCenterVisible10=true  
            }else if(int==11){
                this.helpCenterVisible11=true  
            }else{
                this.helpCenterVisible12=true  
            }
        }
    },
    watch:{
		'$route'(to, from) {
			if(to.params.timeStamp!=from.params.timeStamp){
                this.$router.push('/Empty')
                this.$router.go(-1)
            }
		}
	}
}
</script>
<style lang="scss" scoped>
    .page-wrapper{
        height: 924px;
        .wrapper-center{
            background: #fff;
            padding:30px;
            ul{
                width: 100%;
                margin: 0 auto;
                overflow: hidden;
                li{
                    width: 16.66%;
                    text-align: center;
                    float: left;
                    margin-bottom: 30px;
                    font-size: 12px;
                    img{
                        width:60px;
                        height:60px;
                        border-radius: 50%;
                    }
                    p{
                        margin-bottom: 3px;
                        &.hp2{
                            color: #aaa;
                        }
                    }
                    .listmore{
                        display: block;
                        width: 86px;
                        text-align: center;
                        height: 27px;
                        line-height: 27px;
                        color: #aaa;
                        border-radius: 4px;
                        border: 1px solid #5c686e;
                        cursor: pointer;
                        margin: 0 auto;
                    }
                }
            }
        }
    }
    .layer_content{
        overflow-y: auto;
        height:380px;
        .title{
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size:16px;
            font-weight: 700;
        }
    }
</style>


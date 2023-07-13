import { Stack, Typography, Container, Box } from "@mui/material";
import React, { useState } from "react";
import useFooterStyle from "./footer.style";
import Link from "next/link";
import Image from "next/image";
import useMediaQuery from "@mui/material/useMediaQuery";
import { mobileSizeTrigger } from "src/@core/constance/breakpoints";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { yabexItems, infoItems, cooporateItems } from './FooterData';
import ScrollContainer from 'react-indiana-drag-scroll';
import MapPin from "public/icons/map-pin.svg";
import BrandFacebook from "public/icons/brand-facebook.svg";
import BrandInstagram from "public/icons/brand-instagram.svg";
import BrandTwitter from "public/icons/brand-twitter.svg";
import Line2 from "public/icons/Line2.svg";
import PhoneIcon from "public/icons/phone.svg";
import ChevronUpBlueIcon from "public/icons/chevron-up-blue.svg";
import ChevronDownIcon from "public/icons/chevron-down-blue.svg";


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
const Footer = () => {
  const isMobileSize = useMediaQuery(`(max-width:${mobileSizeTrigger})`);
  const classes = useFooterStyle();
  const [expanded, setExpanded] = useState<string | boolean>(`panel1`);
  const handleChange = (panel: any) => (event: any, isExpanded: string | boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Box className={classes.footerBg}>
      <Container maxWidth="lg">
        <Stack
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
        >
          <Stack
            flexDirection="row"
            gap={2}
            pt={8}
            pb={{ xs: 0, md: 8 }}
            alignItems="center"
          >
            <MapPin />
            <Typography
              variant="h5"
              fontWeight="600"
              color="onPrimary.main"
              alignItems="center"
            >
              نشانی: تهران، نیاوران، جم سنتر، واحد ١٠١١
            </Typography>
          </Stack>
          <Stack
            flexDirection={{ xs: "column", md: "row" }}
            gap={8}
            py={{ xs: 4.75, md: 8 }}
            width={{ xs: "100%", md: "auto" }}
            alignItems={{ xs: "flex-start", md: "center" }}
          >
            <a href="tel:02126370020" className={classes.phone}>
              <Stack
                flexDirection={{ xs: "row-reverse", md: "row" }}
                alignItems="center"
                gap={2}
              >
                <Typography
                  variant="h5"
                  component="span"
                  fontWeight={700}
                  dir="ltr"
                >
                  ۰۲۱ - ۲۶۳۷۰۰۲۰
                </Typography>
                <PhoneIcon />
              </Stack>
            </a>
            {!isMobileSize && (
              <>
                <Line2 />
                <Stack
                  flexDirection="row"
                  gap={2}
                  alignItems="center"
                  className={classes.socials}
                >
                  <a
                    href="https://www.facebook.com/yabex.ir/"
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                  >
                    <BrandFacebook />
                  </a>
                  <a
                    href="https://twitter.com/yabex_net"
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                  >
                    <BrandTwitter />
                  </a>
                  <a
                    href="https://www.instagram.com/yabex.ir"
                    target="_blank"
                    rel="noreferrer noopener nofollow"
                  >
                    <BrandInstagram />
                  </a>
                </Stack>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
      <Box
        sx={{
          width: "100%",
          opacity: 0.1,
          borderBottom: "1px solid #fff",
        }}
      ></Box>
      <Container maxWidth="lg">
        {isMobileSize ? <Box mt={{ xs: 8.5, md: 16 }}>
          <Accordion
            expanded={expanded === `panel1`}
            onChange={handleChange(`panel1`)}
            className={classes.accordion}
            sx={{
              boxShadow: "none",
              borderRadius: "6px",
              mb: 0,
            }}
          >
            <AccordionSummary
              expandIcon={expanded === `panel1` ? <ChevronDownIcon /> : <ChevronDownIcon />}
              aria-controls="panel1bh-content"
              sx={{
                '& .MuiAccordionSummary-content': {
                  my: 0
                }
              }}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
                className={classes.footerTitle}
              >
                یابکس
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack flexDirection="column" gap={2}>
                {yabexItems.map((item, index) =>
                  <Typography
                    key={`yabex${index}`}
                    variant="subtitle2"
                    color="onPrimary.main"
                    fontWeight={600}
                    component={Link}
                    href={item.link}
                    sx={{ textDecoration: "none" }}
                  >
                    {item.name}
                  </Typography>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel2`}
            onChange={handleChange(`panel2`)}
            className={classes.accordion}
            sx={{
              boxShadow: "none",
              borderRadius: "6px",
              mb: 0,
            }}
          >
            <AccordionSummary
              expandIcon={expanded === `panel2` ? <ChevronDownIcon /> : <ChevronDownIcon />}
              aria-controls="panel2bh-content"
              sx={{
                '& .MuiAccordionSummary-content': {
                  my: 0
                }
              }}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
                className={classes.footerTitle}
              >
                اطلاعات
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack flexDirection="column" gap={2}>
                {infoItems.map((item, index) =>
                  <Typography
                    key={`info${index}`}
                    variant="subtitle2"
                    color="onPrimary.main"
                    fontWeight={600}
                    component={Link}
                    href={item.link}
                    sx={{ textDecoration: "none" }}
                  >
                    {item.name}
                  </Typography>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === `panel3`}
            onChange={handleChange(`panel3`)}
            className={classes.accordion}
            sx={{
              boxShadow: "none",
              borderRadius: "6px",
              mb: 0,
            }}
          >
            <AccordionSummary
              expandIcon={expanded === `panel3` ? <ChevronDownIcon /> : <ChevronDownIcon />}
              aria-controls="panel1bh-content"
              sx={{
                '& .MuiAccordionSummary-content': {
                  my: 0
                }
              }}
            >
              <Typography
                variant="h5"
                fontWeight={700}
                mb={2}
                className={classes.footerTitle}
              >
                همکاری
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack flexDirection="column" gap={2}>
                {cooporateItems.map((item, index) =>
                  <Typography
                    key={`cooporate${index}`}
                    variant="subtitle2"
                    color="onPrimary.main"
                    fontWeight={600}
                    component={Link}
                    href={item.link}
                    sx={{ textDecoration: "none" }}
                  >
                    {item.name}
                  </Typography>
                )}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Box>
          :
          <Stack
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            mt={10}
            mb={6}
            width="100%"
          >
            <Stack flexDirection={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              sx={{
                maxWidth: 700,
                width: "100%",
              }}
            >
              <Stack flexDirection="column" gap={2}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  mb={2}
                  className={classes.footerTitle}
                >
                  یابکس
                </Typography>
                {yabexItems.map((item, index) =>
                  <Typography
                    key={`yabex${index}`}
                    variant="h6"
                    color="onPrimary.main"
                    fontWeight={600}
                    component={Link}
                    href={item.link}
                    sx={{ textDecoration: "none" }}
                  >
                    {item.name}
                  </Typography>
                )}
              </Stack>
              <Stack flexDirection="column" gap={2}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  mb={2}
                  className={classes.footerTitle}
                >
                  اطلاعات
                </Typography>
                {infoItems.map((item, index) =>
                  <>
                    {item.isExternal ?
                      <Typography
                        variant="h6"
                        key={`info${index}`}
                        color="onPrimary.main"
                        fontWeight={600}
                        component={Link}
                        href={item.link}
                        sx={{ textDecoration: "none" }}
                      >
                        {item.name}
                      </Typography>
                      :
                      <Typography
                        variant="h6"
                        color="onPrimary.main"
                        fontWeight={600}
                        component="a"
                        href={item.link}
                        rel="noreferrer"
                        target="_blank"
                        sx={{ textDecoration: "none" }}
                      >
                        {item.name}
                      </Typography>
                    }
                  </>
                )}
              </Stack>
              <Stack flexDirection="column" gap={2}>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  mb={2}
                  className={classes.footerTitle}
                >
                  همکاری
                </Typography>
                {cooporateItems.map((item, index) =>
                  <>
                    {item.isExternal ?
                      <Typography
                        variant="h6"
                        key={`cooporate${index}`}
                        color="onPrimary.main"
                        fontWeight={600}
                        component={Link}
                        href={item.link}
                        sx={{ textDecoration: "none" }}
                      >
                        {item.name}
                      </Typography>
                      :
                      <Typography
                        variant="h6"
                        color="onPrimary.main"
                        fontWeight={600}
                        component="a"
                        href={item.link}
                        rel="noreferrer"
                        target="_blank"
                        sx={{ textDecoration: "none" }}
                      >
                        {item.name}
                      </Typography>
                    }
                  </>
                )}
              </Stack>
            </Stack>

            <Stack
              flexDirection="row"
              flexWrap="wrap"
              gap={4}
              sx={{ maxWidth: 284 }}
            >
              <Box
                sx={{
                  width: 84,
                  height: 84,
                  borderRadius: 4,
                  backgroundColor: "onPrimary.main",
                  '& a': {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                  }
                }}
              >
                <a
                  target="_blank"
                  href="http://www.aira.ir"
                  rel="noopener noreferrer nofollow"
                  title="دامنه نرخ بلیت"
                >
                  <Image
                    width="56"
                    height="56"
                    src="https://cdn.yabex.ir/api/images/home/01.png"
                    alt="دامنه نرخ بلیت"
                    title="دامنه نرخ بلیت"
                  />
                </a>
              </Box>
              <Box
                sx={{
                  width: 84,
                  height: 84,
                  borderRadius: 4,
                  backgroundColor: "onPrimary.main",
                  '& a': {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                  }
                }}
              >
                <a
                  target="_blank"
                  href="https://www.cao.ir/paxrights"
                  rel="noopener noreferrer nofollow"
                  title="سامانه حقوق مسافر"
                  className="nextJS_fixed_images"
                >
                  <Image
                    width="56"
                    height="56"
                    src="https://cdn.yabex.ir/api/images/home/02.png"
                    alt="سامانه حقوق مسافر"
                    title="سامانه حقوق مسافر"
                  />
                </a>
              </Box>
              <Box
                sx={{
                  width: 84,
                  height: 84,
                  borderRadius: 4,
                  backgroundColor: "onPrimary.main",
                  '& a': {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                  }
                }}
              >
                <a
                  target="_blank"
                  href="https://eanjoman.ir/"
                  rel="noopener noreferrer nofollow"
                  title="انجمن کسب و کارهای اینترنتی"
                  className="nextJS_fixed_images"
                >
                  <Image
                    width="56"
                    height="56"
                    src="https://cdn.yabex.ir/api/images/home/03.png"
                    alt="انجمن کسب و کارهای اینترنتی"
                    title="انجمن کسب و کارهای اینترنتی"
                  />
                </a>
              </Box>
              <Box
                sx={{
                  width: 84,
                  height: 84,
                  borderRadius: 4,
                  backgroundColor: "onPrimary.main",
                  '& a': {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                  }
                }}
              >
                <a
                  target="_blank"
                  href="https://www.cao.ir/"
                  rel="noopener noreferrer nofollow"
                  title="سازمان هواپیمایی کشوری"
                  className="nextJS_fixed_images"
                >
                  <Image
                    width="56"
                    height="56"
                    src="https://cdn.yabex.ir/api/images/home/04.png"
                    alt="سازمان هواپیمایی کشوری"
                    title="سازمان هواپیمایی کشوری"
                  />
                </a>
              </Box>
              <Box
                sx={{
                  width: 84,
                  height: 84,
                  borderRadius: 4,
                  backgroundColor: "onPrimary.main",
                  '& a': {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                  }
                }}
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  title="logo-samandehi"
                  className="nextJS_fixed_images"
                >
                  <Image
                    width="56"
                    height="56"
                    style={{ cursor: "pointer" }}
                    referrerPolicy="origin"
                    id="jxlzjzpenbqejzpejxlzsizp"
                    onClick={() =>
                      window.open(
                        "https://logo.samandehi.ir/Verify.aspx?id=172719&p=rfthjyoeuiwkjyoerfthpfvl",
                        "Popup",
                        "toolbar=no, scrollbars=no, location=no, statusbar=no, menubar=no, resizable=0, width=450, height=630, top=30"
                      )
                    }
                    alt="logo-samandehi"
                    src="/images/samandehi.png"
                  />
                </a>
              </Box>
              <Box
                sx={{
                  width: 84,
                  height: 84,
                  borderRadius: 4,
                  backgroundColor: "onPrimary.main",
                  '& a': {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                  }
                }}
              >
                <a
                  referrerPolicy="origin"
                  rel="noopener noreferrer nofollow"
                  target="_blank"
                  href="https://trustseal.enamad.ir/?id=169070&amp;Code=gYDE1RFOXBjblVhAiSUP"
                  className="nextJS_fixed_images"
                >
                  <Image
                    width="56"
                    height="56"
                    referrerPolicy="origin"
                    src="/images/enamad.png"
                    alt=""
                    style={{ cursor: "pointer" }}
                    id="gYDE1RFOXBjblVhAiSUP"
                  />
                </a>
              </Box>
            </Stack>
          </Stack>
        }
      </Container>
      <Box
        sx={{
          width: "100%",
          opacity: 0.1,
          borderBottom: "1px solid #fff",
        }}
      ></Box>
      <Container maxWidth="lg" >
        {isMobileSize ?
          <Box sx={{
            px: 2
          }}>
            <ScrollContainer horizontal={true} vertical={false} >
              <Stack
                display="inline-flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                py={6}
                gap={2}
                className={classes.footerBottomLinks}
              >
                <Typography
                  component={Link}
                  variant="subtitle2"
                  fontWeight="600"
                  href="/flight/kish"
                  whiteSpace="nowrap"
                >
                  بلیط هواپیما کیش
                </Typography>
                <Box className={classes.circles}></Box>
                <Typography
                  component={Link}
                  variant="subtitle2"
                  fontWeight="600"
                  href="/flight/mashhad"
                  whiteSpace="nowrap"
                >
                  بلیط هواپیما مشهد
                </Typography>
                <Box className={classes.circles}></Box>
                <Typography
                  component={Link}
                  variant="subtitle2"
                  fontWeight="600"
                  href="/flight/shiraz"
                  whiteSpace="nowrap"
                >
                  بلیط هواپیما شیراز
                </Typography>
                <Box className={classes.circles}></Box>
                <Typography
                  component={Link}
                  variant="subtitle2"
                  fontWeight="600"
                  href="/flight/isfahan"
                  whiteSpace="nowrap"
                >
                  بلیط هواپیما اصفهان
                </Typography>
                <Box className={classes.circles}></Box>
                <Typography
                  component={Link}
                  variant="subtitle2"
                  fontWeight="600"
                  href="/flight/dubai"
                  whiteSpace="nowrap"
                >
                  بلیط هواپیما دبی
                </Typography>
                <Box className={classes.circles}></Box>
                <Typography
                  component={Link}
                  variant="subtitle2"
                  fontWeight="600"
                  href="/flight/istanbul"
                  whiteSpace="nowrap"
                >
                  بلیط هواپیما استانبول
                </Typography>
                <Box className={classes.circles}></Box>
                <Typography
                  component={Link}
                  variant="subtitle2"
                  fontWeight="600"
                  href="/flight/doha"
                  whiteSpace="nowrap"
                >
                  بلیط هواپیما دوحه
                </Typography>
                <Box className={classes.circles}></Box>
                <Typography
                  component={Link}
                  variant="subtitle2"
                  fontWeight="600"
                  href="/flight"
                  whiteSpace="nowrap"
                >
                  بلیط هواپیما ارزان
                </Typography>
                <Box className={classes.circles}></Box>
                <Typography
                  component={Link}
                  variant="subtitle2"
                  fontWeight="600"
                  href="/flight"
                  whiteSpace="nowrap"
                >
                  بلیط هواپیما چارتر
                </Typography>
              </Stack>
            </ScrollContainer>
          </Box>
          :
          <Stack
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            py={6}
            className={classes.footerBottomLinks}
          >
            <Typography
              component={Link}
              variant="subtitle2"
              fontWeight="600"
              href="/flight/kish"
            >
              بلیط هواپیما کیش
            </Typography>
            <Box className={classes.circles}></Box>
            <Typography
              component={Link}
              variant="subtitle2"
              fontWeight="600"
              href="/flight/mashhad"
            >
              بلیط هواپیما مشهد
            </Typography>
            <Box className={classes.circles}></Box>
            <Typography
              component={Link}
              variant="subtitle2"
              fontWeight="600"
              href="/flight/shiraz"
            >
              بلیط هواپیما شیراز
            </Typography>
            <Box className={classes.circles}></Box>
            <Typography
              component={Link}
              variant="subtitle2"
              fontWeight="600"
              href="/flight/isfahan"
            >
              بلیط هواپیما اصفهان
            </Typography>
            <Box className={classes.circles}></Box>
            <Typography
              component={Link}
              variant="subtitle2"
              fontWeight="600"
              href="/flight/dubai"
            >
              بلیط هواپیما دبی
            </Typography>
            <Box className={classes.circles}></Box>
            <Typography
              component={Link}
              variant="subtitle2"
              fontWeight="600"
              href="/flight/istanbul"
            >
              بلیط هواپیما استانبول
            </Typography>
            <Box className={classes.circles}></Box>
            <Typography
              component={Link}
              variant="subtitle2"
              fontWeight="600"
              href="/flight/doha"
            >
              بلیط هواپیما دوحه
            </Typography>
            <Box className={classes.circles}></Box>
            <Typography
              component={Link}
              variant="subtitle2"
              fontWeight="600"
              href="/flight"
            >
              بلیط هواپیما ارزان
            </Typography>
            <Box className={classes.circles}></Box>
            <Typography
              component={Link}
              variant="subtitle2"
              fontWeight="600"
              href="/flight"
            >
              بلیط هواپیما چارتر
            </Typography>
          </Stack>
        }


      </Container>
      <Box
        sx={{
          flexWrap: "wrap",
          width: "100%",
          opacity: 0.1,
          borderBottom: '1px solid #fff'
        }}
      ></Box>
      <Stack
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        py={6}
        sx={{
          width: "100%",
        }}
      >
        <Typography
          sx={{
            opacity: 0.4,
            color: "onPrimary.main",
            textDecoration: "none",
            fontSize: "0.610rem!important",
          }}
          variant="caption"
          fontWeight={600}
        >
          کلیه حقوق مادی و معنوی وب سایت برای یابکس محفوظ است.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;

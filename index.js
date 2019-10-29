const puppeteer = require('puppeteer');
const Crawler = require('crawler');

(async () =>{
  const browser = await puppeteer.launch({
    //headless: false
  });
  const sitepesquisa = 'https://www.pneufree.com.br/vendas/passeio/195/55/15';
  const page = await browser.newPage();
  await page.goto('https://www.pneufree.com.br/cliente/login');
  await page.waitFor('input[name="username"]');
  await page.type('input[name="username"]','mail@mail', {delay: 100});
  await page.type('input[name="password"]', '*********', {delay: 100});
  await page.keyboard.press('Enter');

  //Clicando no seletor
  await page.waitFor('#wrapper > a');
  await page.click('#wrapper > a');

  //Pesquisa
  await page.goto(sitepesquisa);

  // Realiza screenshot
  await page.screenshot({path:'pneu-195-55-15.png', fullPage:true});

  const raspar = new Crawler({
    callback : function (error,res,done){
      if(error){
        console.log(error);
      }else{
        const $ = res.$;
        console.log($('#wrapper > div.centerdiv > div.gridProd').text().trim())
      }
      done();
    }
  });
  raspar.queue(sitepesquisa);

  await browser.close();
})();
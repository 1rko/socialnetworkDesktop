import React from 'react';
import styles from './Users.module.css'
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../../DAL/Dal";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalCount / props.usersCount)
    let pages = []

    //////Плохо работает перелистывание страниц
    if ((props.currentPage > 3) && (props.currentPage < (pagesCount - 3))) {
        pages = [1, props.currentPage - 1, props.currentPage, props.currentPage + 1, pagesCount]
    } else {
        pages = [1, 2, 3, pagesCount - 2, pagesCount - 1, pagesCount]
    }

    /*for (let i = 1; i <= props.currentPage + 1; i++) {
        pages.push(i)
    }

    let slicedPages;
    let curPage = props.currentPage;
    if (curPage - 3 < 0) {
        slicedPages = pages.slice(0, 5);
    } else {
        slicedPages = pages.slice(curPage - 3, curPage + 2);
    }*/

    pages = pages.map(page => {
        return <span
            className={((props.currentPage === page) && styles.selectedUsersPage) + ' ' + styles.pageItem}
            onClick={() => {
                props.onPageChanged(page)
            }}>{page + "_"}</span>
    })
    ////////

    let avatarForAll = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQERUTERAVEhIWGBIXGBgVFxYYFxcYGBUWGhYZGBsbHCkgGB0lGxgWITEhJS0rLi4uGB84ODMtNygtLysBCgoKDg0OGxAQGy8mICUtLS0vKy0tLy0tLS8tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgEDBAUHCAL/xABHEAABBAECAwUDBwoEAwkAAAABAAIDEQQSIQUGMQcTIkFRYXGRFDJCVYGToRUWI1JUkqLR0tMXU7HBQ2KUJTNERXKj1OHw/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAOREAAgEDAQYDBQYEBwAAAAAAAAECAxEhMQQSQVFhcSKBkRMyobHhBRTB0fDxI0JSkhUzcqLC0+L/2gAMAwEAAhEDEQA/AO4FEKIAiIgCIiAIiIAiIgCIiAIiIAisvyGN6uaLIbuQNzVD37jb2r6ila8BzXBzT0IIIPuIQFxERAEREAREQBERAEREAREQBERACiFEAREQBERAEREAREQBFamlawFziAACST0AHUlQjnPtDx8NjgyQOksssDUGu+z0Ad9oHqpUW9DSnTlUdl68F1b5Em4vx3HxBeRII21dkEig4Nd09C4X6A30Brj3N3avOyYxQWAGu8THM6yOa5nVjg7THQHqXEn0UB5i5ryM57nSuoE7AWNgHAA70dnuv1taBbKKRo504K0Fd4y0sappJ8HjXljpusjmjMkeXvyHOcWPZZ+iHkGQtr5rnVRcN6PuqVcE7Xc3GaGOZE+NrQyNjWhjWAAhtULNeEDyAB2JNjniI1cydWbd278c5+dz0Jy12jQMx++4hnR98+iIIgXGNn0QQLLpD85x6C6AbSnvBOKx5kLZ4dXdPssLmlhcP1gHb0fIkC+vSl4+U95D7SJuHud8odkZcZaxrIzN4GBt7gPBryADaG297VSUORVu7uelkWj5S5jj4ljMyImPYHDcPB2cDRAPR1HzC3izICIiAIiIAiIgCIiAIiIAUQogCIiAIiIAiIgCoSqrU8ZyozFkRCRpkETrYHDU0PDmsJHUAm6J22KFoR3pJc2cw7U+0ANHc4xOuqvoaezruOgdbSPPcHbY8WlldK+3Eue4jr1J2A/2C2HNTrzJjZO+1+4X/Fq+21ql0tWwjo2udpulHEYtpLnZvL5t/DRFyeJzHOY8U5pc1w9HNNEfEK2r+FjCR2kyMjFE280NvL3lZfLcOLJkMbmyOixyH6nNvUDpOno130q8lByyTjDefX4dNTWqi6N+ReXPrHJ/i/8AjrQ83YXC4mRnh2TLM8uIeH3Qbp2IuNvmhzQ2hSdt2S7qxGFRZmbBE1kRjkL3ObcgqtDqbt036n4LEQ65wcHZ28nfhc6b2McZdFM6PU5znaW1omlc2MeTaqOFt/ScT0ArzXoVrrXmjsfOSziMZjDxA8SCV2k6CxrSevTUHAAeln1K9KsGwo2PaspnPB/xJRvyZ9oiKhsEREAREQBERAEREAKIUQBERAEREARFYyJ9Auid6QrOagnKWiIXy9DxccWyXZRd+TiJu5t0Jb89nd0GnWPDq6qRcexgIZ3sDWSGN2p2lpL2tY7wOPUiia32J+w4PaPg5ORw2eLDDjkO7nQGPDHbTRudTiQB4Q7zUb7M+B8Qx8LMj4g2QSSX3feStlOkxEbEPdW/kpXM1pvdqRb4NHCOY7+VTaqsOqwKB2FGr6kbn22rb34/ydrRG4ZAcS59nSW+KgBq6/N8vJZfOEZbmy356HD3Fjf9wVlcocUwcfvfl2GcrV3fd1pOitevq4dbZ+6umWJM12yTpVqy3d53kub97VX49SOq5DLpcCWteB9F10dvOiD+K6D+c/Avqd/7sf8AcUKlibk5EpgDYoy6V7GuIbpZZLW+YsChSqcezzqVJ2UGnwvbP69OZd4O+N+S0yQ6mO1Du42udZ0mg1tknfdSHIy+GxuLZMRzHCra+N7SL3Gx3UV4NxJ+LPHPGGl8Z1NDwS26I3AIPn6rI43xWTiGS6aTu2ySaAdNsYNLQ0fOca2G5JVlKx3UNuq0nuxhBp5u43d3w7fIxeKPjdK8xDTGT4RVUKHl8VaypGudbWCMUPCCT0G5s+vVUhmcw21xadxY9CCD8QSraqYSnvXfN30VuePV/U612NcffLXD+7AZHHLKHhxDiTM06T5AeM/Bd4Z06UvJHKXM83DJXSwMje5zQw96HEAag7bS4eYC6BwPtl4hPlY8L4cQMlmhjcWsl1Br5GtJFykXR9qpNM5KVHcqTktHb6/E7wiIsjoCIiAIiIAiIgCIiAFEKIAiIgCIiAIi1vMU8seJkPxwXTthmdEA3UTIGOLAG/SOqtvNAbJQ/nDnvF4bbZxKSdLbjDTRcL83Do3f/wC1zL88uaP2Sb/oXf0rQ875OZkYrJs6J8eR3g1h8ZiOkhzWODSBtQaL9bWsad73OjZ6UainfhFtd01+F3Y0nOs4kydbSHNfGxzSOlG/hva+YIH6G/8AZXebDxn5UNW3zvDIG7+wUtITdDyHT2b3/qSt9Dzbksa1o7umgNHh8gKC1w3k0ctn2mrOddyjfK3efHy/YtZEgiAMvC2MB2Gp2WL91yr4gy4XuaxvD4S5xDR+kyupND/jL54jxqbL0Mk07OFUK3O2+/tUp4x2XZOLBLO7JhIiY55DQ8OOkXtt1VWlc4dpey0qijGT3XpdtN6X0v2I3mTxxPdG/h8Ic00f0mUfK/8AOVlvEYL3wYa86kyun3yw8WZrXh0kYmG9tc54DtiBbmkO22Ox8ln/AJUxvq6D73L/ALqhlZqKk92Lt/q+eUYXETEZXnHDxDfgElaw30dRI9fP0WZkT45womNaPlQlmL3aSCYyBoGrz3vbyVfynjfV0H3uX/dWqUhJu101bqs68m/3sdF7IMfCPyubPjgdDEMfxTsY5rb7261A7mmihudl2rhPL/C5GRZGPhYlODJI5GQRtPk5rmnSC09D6heVflL+77rUe7LtZb5F1aQT60Lr0s+q9GdluU3E4PC7JlbHGG69cjg1jGyyOLAXHYDxNA96pNFU1CeX7zx5R+l/M6Ci13C+N42Vq+TZMM+itXdSMfp1Xp1aSauj8CtisjYIiIAiIgCIiAIiIAUQogCIiAIiIAiIgC5z2z8J77E1gWac37QO8Z+LXfFTnikkzWXAxr5LFBxoV5+YUY43Hn5ETmSY0Qbs62u8Xh328W/mPtWlPEk7no/Z9Ne0U5Sio5TTkk7NWeHws/geZTA7QJNJ0E6Q6tifS/XYqy7otlxfHlgkfjku0McS1pJ00b0ur1ogX71rlq8YOKrD2ctx3usO/Pj5X0JBzNxHBkfC7BxnQBg/SB9DW4FpBFPd6H06qR8b7VZMrHlgOGxglY9moSEkahV1p3Ua5Z5XfnCQtyIIe7LQe+cW6tQJ8NA30Ulg5BmZFLEM3hpEvd25zyXt0OJGh2nw3dH1Cg8yq9njaM3dx5376/rSxzxFOP8ADSX6wwPvXf0qv+Gkv1hg/eu/pQ1++0P6vn+RrIeUmua13yyMagDWgbWLr56uDk5v7dH+4P61q+ZeXnYMjY3SwzFzdVwkuaPERRsDfZYXC8ATytiMsUOq/wBJM7RG2mk+J1bXVD2kK11yPVjtmxuG97C6578vyufEuMe8MTTrdrMba+kdWkV7yvUL+VosnhxwXucyIthjuPSHARFpbVgjq0DovO/Z/iibiWI09O8a/wC7DpAPiwL09nYr3YUrI/8AvHQyhu9eJzHad/LcjdZTeDy5+LaVZYSb9Xb5XNTyNyLBwjvu4llk77u9XelhrRrqtLR+uevoFLFwTlPkjjkObjSTiTuWSxOkvKa4aQ4arb3hv3LvazZ0hERQAiIgCIiAIiIAUQogCIiAIiIAtdxzjMGDCZsmTuogWgupzqLjQ2aCeq2KsZOKyVumRjXt28L2hw26bHZARL/Fbg37e37qf+2n+K3Bv29v3U/9tSP8g4n7JB91H/JR3nfOwOE47Z5cCORrpGx0yKEEFzXuvxACvAfipwCF898wcFz4v0E8ZyCXtBEUrXfpW6SSSweYYd/auMYz+7kBewO0u8THdDR3aV1zK7U+EvY5n5KLdQItrMYEWNiDexHVcp4tlMmnfJGC1rjqo1YJ+d09TZ+1bR0Ol1b0ou/ii8c2nm/WzVs8HbJZzJWyPc4RtYCbDR0b7BsrGgegWbwvIjjeTLB3zaI03p3sb38fitqOLYZNDhoJ9BK4n/RXWeIhTjUTlKok23hqX4RaI7oHoFt+XuDR5Rl15MWP3cZeO8Df0hH0G24b/FZR4ziD/wAsb9sjv6Vqcx7ZZSY4hGHFoawG6NAddup3+1Q11M69GKj4Kqb6KX/JJdPMxG+6lfxcd0r2xsFve5rGj1c4gNHxIWz/ADWzf2Y/vxf1Lq/ZHzAybFZiNik147CXvIbot8ji0Np2qzv5fRPsRprU59t9tssN+dN+aa+az9ST8r8h4uLpkhhb3oY2N0pJJNNAc4Amml1b6QLtTXJjJjLRudgsH8mP9R+P8ljZ8bYGh0sjWNJoE31omtvYCssN6nlUobTZx9lKUpKz8WX2Vn+Juodmgez/AGV1a/h3FYZ7EMgeWgXV7X06j2LYKjTWp7Lpyp+GSs1wYREUEBERAEREAREQAohRAEREARW43g3XkaPvVxCE01dBERCTS8y80YvDmsflyFjZHaG0x77dV14Qa2WbxPHgkZWQyN7AQalDS0HcA+La9z8VrOMwYWZMzGyY4Z3NDnhr3xlzXUKHd6tdlpLrqqafYsvmDhzsmExtcGklps9Nj7FKtfJenGMpxU3ZNq71sufkfEHA8B4tmJiuHS2xREfgFzjtfwcXHiJGJEGlsd92xjHUZdL6IHWi1wPkW+YJCl83BcvHwJIsaQHJMkbmlpA8OuLvBb9vmNf8Vp+2LBM8TI2kBz2vAJ6bOYRdLSCW/ZdTs2ehGe0SpU3vJxmk+fhdsfDszz/nYJic0Bwex4Do5OjXtJq9/mkGw4H5pB962nD+GT48gkjyMLW26vLxiNwQf+J6Faidz2aoS6w17tvLUPCXC+l19tC+gVgdd+iuefepCScXZp8r2a81Zo3vLOJFk8RZHlub3b3y94WvDWk6ZHW14NVqAog7/as3tE4Ti4eTGzCdbDGHkiTXT9bx1s1sG7LH4TwOLOlm7rXBE3QWNdUjgHXsXbXu38VoMmEMe9g+i5zb9aJF/gpaxctPZayUNpk2oyurc3fPHVZ1Lp4lP/ny/eP/AJrq3Zdxvh+BFokyou8dLqmc9xaK7sEd34T3gaabvVkvINAXyBTDkjklvE9I+XMx5HumDGOjLi/umRF5HjAupBt1oE+Rqr0Mq/8AFUVUbeV169eR3n/EfhP1hD8T/JXuY8Y52LGcdzXtcWSNddBzDG6iPfqC5l/gNJ9ZM+4d/cXUseRnDMLHilcXCNkMGprfnFkdXV7A6Ss44a3Tr2aVSNaMqSvK+Frkw+TeBy4pk70NAcGgaXX0Lr/2Uoe6gT6LWSPflQsfjZBgDt7MbXkjcVTum62wUSk5O7G11qlarKc8S005K2nkUa6xaqiKpgEREAREQBERACiFEAREQClrg3IErnPlh+TVszuniQbCy6Qy6SL1H5g2I9N9isLi+PHLBLHMdMUjHxvNhvhe0tduemxQFz8oQ/50f77f5rH4vA/JxpGY+R3L3tIZKzxaD+sKIv4rjnGuXOV8SxJPK94+jFIXn8G0qxdqsfD8aGDAwJDjt1tjfO8jWA630QNyC7f0sK24zSVKUffx3w/TX4E+4dyK2HNgz3zvmyWRNjle40HlsAi1htbE0SbJ6rN43z5w/D2myml1XpZ43H3VsuZ8T7UZponnwsjaAJHMupHOB0wxXuB5ukPUDYAbnkuVkOle57zb3Gz/ACHsA2+xaKHM2nSjSinUy3ok+HNvjnCtra97Wb7BzB24G6wscVfzpfP7P/3vUF5r5yzMpzO8nI8DHHSNIBf+kAb5hoa5o671uSoohKskloZqvJXUbLhjD9b3zxz00unVxJNk2TuSepPtVERDAqHEdCR7iQqFEQBXsbMkicx0cjmOjdrYWmi1/h8Q9vhb8Fu+EctDIx3TmUtI7zwhgI8I9bUdapa5m1XZ6lOMZTVlJXXVfrmdt5X7aHSPZFk4pc4t+fCWg21pLzoeQKppd123FHZTfE5m4VxZrY25LHG9Qjc50Ul0R80047E9LC8yYrIS2TvZCwhhMYDdQe+xTXfqir39ivcC4o3FmEjhqADhQI8215qiir62IoO1SPi3crxZx1xY9c4UUULGxxkBjRQGq/b1JtQXj3CeYHZEhwuKQfJybY2VkYewH6JrHdYB2BuyOq5jw/nKKZ4aWiJvUvkkaGtHmdhbj/ytBJW74F2o4mDM+mSTsPhLmBrdru2teQT5bGklCKTalfyO6vs+yqEpwr70tbbrV7vm33Z0Hk/h3HIsjVxLNgnx9DhpjDQ7XY0naBm1X5+anCjHK3PODxFzm48vjbXhfTXuBaCSxpOpwF0TXVRTjvJXGJuJuyIc8MxTLE8R/KMhtMbo1N0Nbp3p211usuJ5p1JERQAiIgCIiAFEKIAi+JXaWk+gJ+AXHR2+w/V8n3zP6VKTegOxPeGi3EADzOwXDe2vmKXvBDHK5rC97RpP+WBr6eep1X12pWuOdswmZpgw3McbJL3tkb08Phqqvf7Aoc/n3NcNzCTbjZx4D16/R9d79q1grZNKVedJNxSu00nvNOOVn3cNpNYeE9eBFQ4eoWU2NhhLzOO8Dw1sVOJLSLc8O+aACAK6rd/nxm+sH/TY/wDQsbiXNWTkxmKUxFh0k6YYWHYgjxNaCNwrHKvaYukl3/8AJptZqrNAk15WQAT76A+CoiIahS7lXj3DseAsy+HfKZdbjr0xnwkNpviN7UfioiiFKlNVI7r+DsdH/PDgv1KP3If5qD8cyopsiSSCLuYXEFkdAaRpAqht1BP2rARClKhCm7xv5tsoqqiIbFxsrgKD3AegcQPha+EVEBseEcdycMuONO6Ev0h2nTvpursHpZ+K2f5+cT/bpP8A2/6VHEQzlSpyd5RTfZEj/P7in7dJ8I/6V9fn9xT9uk+Ef9CxeWOH4U5k+W5hxQ3RophdrvVq6A1VN+KzOYeE8Nih1YnEXZMupo0Fhb4T843pHRDJwoqW7uf7cetiOTTue8yOcTI5xeXdDqJsu26Gzey6l2VdpM7MhmLnTOmhlLWMfIbdE8mm247ua4kDcmtvK1BcV/D/AMnyB4f+UNf6MjXo0amda8Pze86rRE+qhq5vGad+mD2oi898jYHFuLQvkg43Iwxu0OY+WYubtbTt5EXR9h9F3nhkL44YmSP1yNZG17tzqcGgOdZ3NmzusWrFk0zLREUEhERACiFEAWJlOLaIaNO+omthtv8AC1HOZMrPZNWMHmPS3pGHC9730n2LR8Q4pxFrHCcObG4FpLo2tHiBFXp22taxpN2yj0af2RPaIRcasVvW/m8S8rPJA+bzFxPOkjmzosNrAZAZapxcfCzdzd2sA+K1f5kYX1/ifBv95RLiGYJsh8hGprnk10toNAX5eEAWrfEJo3yudFD3EZPhjDnP0Chtqdu7139VpLLweft8p1tolOE2o6LCeFha50S87kw/MjC+v8T4N/vJ+ZGF9f4nwb/eUHX33Z06tJ03putrq6v1relFjlVCs9Kj/tRuuZuBwYnd9zxCHM169XdUNFaaunu62fTotRid3rHfFwj31aK1dDVXt1pWURG9K8LXy1zWvdcjcgcN/Wy/hErHBuDS5szosVupwD3gOcG+BpAsk7XuFrV9RyFptri0+oJB/BS3c2r1nUVoxjF9F885PnrvR+BS/ettDzNlsaGtyCGtAAGiPYAUBu1ff51Z37Sfu4v6VNlzNN3Z/wCuX9i/7DTKiyc/OknfrmfqdQF0BsLroK81jqphJJPGna3wu/myiqi+ooy9wa1pc49GtBLj7gNyhB9wwOkvSL0tLj7GjqVaUq4T2dcRyKPyfuWn6U50fw7v/hUw4b2Nj/xGY4n9WFoH8Trv90Ic1TbNnhhyz0z8l+JyQrL4rltmfrbDHANLW6YxTbAou38z5rvvD+yfBZROK6Qjzlkcfi0ENPwUgxeRcOP5uHjNPqIYyfjptRvIye0yl7lOT74OBYHMsEhaMuOMMjZpb4ddk6b2o1s1at3FzFPK/G0BjztbBWnyoEbL1E3l2IfQjHuiasbJ5OxZRUmPA8f80LD/AKhT7Q75/a23VIrep5TumpLe0trfl0OC8m84ObmRNy3D5M9wZJoqMt1bNfbaNNJBPstejuH8KigJMYdbgAdTnO2HpZ2UK4p2TcPmuscRn1hcY/4fmfgpjwLHdDAyF7nPMbWs1vrU4AU0uI2Jobnz+1UnJviR/iO0VfBUlPPBttYzzaNoiIsgEREAKIUQBca5uweY8iSVgji+S97KYvFjtOi3CMkl13oPnuuyrGzcOOZuiRgc2waPSx0UxdmXpy3ZJ3a6rVdtDyNxXgOTiODJoXNJuqpw2NEW2xY9PaPIhYBY4dWke8EL1pl8rYr2lrYxGSCLYSCPxXFOfuSeJwXUj8zGvUKa3vG101NaLdXq37QFspRegqz2aH80lyvGNuze9jzXa5zVjC400Fx9ACT8AquseE2KPQ2KPTp6q/w3PfjyiRla22NxY3BBsWreVOZHue6tTiXGuln0UhqKhe73r6Wxbv3xYtKiqiGYRfbYyQSGkgdSAaHvPkqRRl7g1oLnHo1oJcfcBuUJPlFKuEdnnEcmiMfuWn6U57v+Gi/+FTngfY7ECDkzvmP6kQ0N9xO7j7xpQ5am2UYYcrvks/T4nHWNsgAWSQABuST0AHmpZwbs64hk0e57hh+lOdH8FF/xAXe+BcnY+IP0GPHBtWoC3ke1xtx+0rfxYLB18Xv6fBVc0jP2u0VPchurnL8jkfAux/GbRyJJMh3m1txx/gdX8Q9y6HwblaHGbphhigHnoaAT7yNz7ySpI1oHQUqqm+yfue/mtJy6aL0RiR4DB18SyI2AdAB7l9oqt3OmnShT9xJdgiIoNAiIgCIiAIiIAiIgBRCiAIiIAviRgcKIsL7RCGk8MifH+Q8LMsy47HOP0tJa/wDfbTvioZndiuKSSyTIj9mqN7fxbq+JXX0V1NnP91S/y5OPZ49HdHDz2Js/a5fu2fzWTB2K4/058l3/AKe6b/qwrs6Jvso9nqvWq/RIgfA+QMfFikhjhLo5q7wSuDtem6sH3+QW+4dy5HA3TFHHC30jYGj8AFvkTfZX7hSbvNuXd/lYxI+HsHW3LJa0DYCvcvpFVu51U6UKatBJdgiIoNAiIgCIiAIiIAiIgCIiAIiIAiIgBRVRAURVRAURVRAURVRAURVRAURVRAURVRAURVRAURVRAURVRAURVRAURVRAURVRAURVRAURVRAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAf/2Q=="

    const allUsers = props.usersData.map(usersItem => {
        return <div className={styles.user_item}>
            <NavLink to={"/profile/" + usersItem.id}>
                <img src={(usersItem.photos.small != null) ? usersItem.photos.small : avatarForAll}
                     className={styles.ava}
                     alt='Аватар'/>
            </NavLink>
            <div>{usersItem.id}</div>
            <div>{usersItem.name}</div>
            <div>{usersItem.status}</div>

            {
                usersItem.followed ?
                    <button onClick={() => {
                        usersAPI.unFollowUser(usersItem.id)
                            .then(data => {
                                if (data.resultCode == 0)
                                    props.onUnFollow(usersItem.id)
                            })
                    }}> 'Unfollow' </button> :

                    <button onClick={() => {

                        usersAPI.followUser(usersItem.id)
                            .then(  data => {
                                if (data.resultCode == 0)
                                    props.onFollow(usersItem.id)
                            })
                    }}>'Follow' </button>
            }
        </div>
    })

    return (
        <div className={styles.users_wrapper}>
            {pages}
            {allUsers}
        </div>
    )
}

export default Users;
